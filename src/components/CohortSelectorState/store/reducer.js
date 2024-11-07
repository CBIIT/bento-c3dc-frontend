import _ from "lodash";

export const initialState = {
};

const COHORTS = "COHORTS";
const TEMPORARY_COHORT = "TEMPORARY_COHORT";

const participantObjectTemplate = {
  participant_id: '',
  dbgap_accession: '',
  participant_pk: '',
};

const cohortObjectTemplate = {
  cohortId: '',
  cohortName: '',
  cohortDescription: '',
  participants: [],
  lastUpdated: '',
};

const isValidParticipant = (participant) => {
  return Object.keys(participantObjectTemplate).every(key => 
    typeof participant[key] === typeof participantObjectTemplate[key] && 
    participant[key].trim() !== ''
  );
};

const isValidCohort = (cohort) => {
  if (!Object.keys(cohortObjectTemplate).every(key => key in cohort)) {
    return false;
  }

  if (
    typeof cohort.cohortId !== 'string' || cohort.cohortId.trim() === '' ||
    typeof cohort.cohortName !== 'string' || cohort.cohortName.trim() === '' ||
    typeof cohort.cohortDescription !== 'string' ||
    !Array.isArray(cohort.participants) ||
    typeof cohort.lastUpdated !== 'string' || isNaN(Date.parse(cohort.lastUpdated))
  ) {
    return false;
  }

  // eslint-disable-next-line no-unused-vars
  for (const participant of cohort.participants) {
    if (!isValidParticipant(participant)) {
      return false;
    }
  }

  return true;
};

const createNewCohort = (state, payload) => {
  let { cohortId, cohortName, participants, cohortDescription = '' } = payload;

  // If no cohortId is provided, default to "New Cohort"
  if (!cohortId) {
    cohortId = "New Cohort";
    let counter = 1;

    // Increment the cohort name if it already exists
    while (state[COHORTS][cohortId]) {
      cohortId = `New Cohort ${counter}`;
      counter++;
    }
  }

  if (!cohortName) {
    cohortName = cohortId;
  }

  if (state[COHORTS][cohortId]) {
    throw new Error(`Cohort with ID ${cohortId} already exists`);
  }

  const newCohort = {
    ..._.cloneDeep(cohortObjectTemplate),
    cohortId,
    cohortName,
    participants,
    cohortDescription,
    lastUpdated: new Date().toISOString(),
  };



  if (!isValidCohort(newCohort)) {
    throw new Error('Invalid cohort data');
  }

  const newState = {
    ...state,
    [COHORTS] : {
      ...state[COHORTS],
      [cohortId]: newCohort,
    },
  };

  return {newState, count: participants.length};
};

const addParticipantsToCohort = (state, payload, ) => {
  const { cohortId, participants } = payload;

  if (!state[COHORTS][cohortId]) {
    throw new Error(`Cohort with ID ${cohortId} does not exist`);
  }

  // Get existing participant PKs
  const existingParticipantPks = new Set(state[COHORTS][cohortId].participants.map(p => p.participant_pk));

  // Filter out participants with duplicate PKs
  const newParticipants = participants.filter(p => !existingParticipantPks.has(p.participant_pk));

  const updatedParticipants = [
    ...state[COHORTS][cohortId].participants,
    ...newParticipants
  ];

  const newCohort = {
    ...state[COHORTS][cohortId],
    participants: updatedParticipants,
    lastUpdated: new Date().toISOString(),
  };

  if (!isValidCohort(newCohort)) {
    throw new Error('Invalid cohort data');
  }

  const newState = {
    ...state,
    [COHORTS] : {
      ...state[COHORTS],
      [cohortId]: newCohort,
    },
  };

  return {newState, count: newParticipants.length};
};

const mutateSingleCohort = (state, payload) => {
  const { cohortId, data } = payload;
  const { cohortName } = data;

  if (!state[COHORTS][cohortId]) {
    throw new Error(`Cohort with ID ${cohortId} does not exist`);
  }

  const newCohort = {
    ...state[COHORTS][cohortId],
    ...data,
    cohortName: cohortName || state[COHORTS][cohortId].cohortName,
    lastUpdated: new Date().toISOString(),
  };

  if (!isValidCohort(newCohort)) {
    throw new Error('Invalid cohort data');
  }

  let newState = { 
    ...state,
    [COHORTS] : {
      ...state[COHORTS],
    },
   };

  // Check if cohortName is different from cohortId
  if (cohortName && cohortName !== cohortId) {
    // Create a new entry with the new cohort ID
    if (state[cohortName]) {
      throw new Error(`Cohort with Name ${cohortName} already exists, please choose a different name`);
    }
    newCohort.cohortId = cohortName;
    newState[COHORTS][cohortName] = newCohort;
    // Delete the old entry
    delete newState[COHORTS][cohortId];
  } else {
    newState[COHORTS][cohortId] = newCohort;
  }

  return newState;
};

const trackTemporaryCohort = (state, payload) => {
  const { cohortId, data } = payload;
  const { cohortName } = data;

  if (!state[COHORTS][cohortId]) {
    throw new Error(`Cohort with ID ${cohortId} does not exist`);
  }

  const newCohort = {
    ...state[COHORTS][cohortId],
    ...data,
    cohortName: cohortName || state[COHORTS][cohortId].cohortName,
    lastUpdated: new Date().toISOString(),
  };

  if (!isValidCohort(newCohort)) {
    throw new Error('Invalid cohort data');
  }

  delete newCohort['lastUpdated'];

  let newState = { 
    ...state,
    [COHORTS] : {
      ...state[COHORTS],
    },
    [TEMPORARY_COHORT]: newCohort,
   };

  return newState;
};

const clearTemporaryCohort = (state) => {
  let newState = { 
    ...state,
    [COHORTS]: {
      ...state[COHORTS],
    },
  };

  delete newState[TEMPORARY_COHORT];
  return newState;
}

const deleteSingleCohort = (state, payload) => {
  const { cohortId } = payload;

  if (!state[COHORTS][cohortId]) {
    throw new Error(`Cohort with ID ${cohortId} does not exist`);
  }

  const { [cohortId]: removedCohort, ...updatedCohorts } = state[COHORTS];

  return {
    ...state,
    [COHORTS]: updatedCohorts,
  };
};


const deleteAllCohort = (state) => {
  return {
    ...state,
    [COHORTS]: {}
  };
};

export const reducer = (state, action) => {
  const { type, payload } = action;
  let newState;
  let count;

  try {
    switch (type) {
      case 'CREATE_NEW_COHORT':
        ({ newState, count } = createNewCohort(state, payload));
        break;
      case 'MUTATE_SINGLE_COHORT':
        newState = mutateSingleCohort(state, payload);
        break;
      case 'TRACK_TEMPORARY_COHORT':
        newState = trackTemporaryCohort(state, payload);
        break;
      case 'CLEAR_TEMPORARY_COHORT':
        newState = clearTemporaryCohort(state);
        break;
      case 'DELETE_SINGLE_COHORT':
        newState = deleteSingleCohort(state, payload);
        break;
      case 'DELETE_ALL_COHORT':
        newState = deleteAllCohort(state);
        break;
      case 'ADD_PARTICIPANTS_TO_COHORT':
        ({ newState, count } = addParticipantsToCohort(state, payload));
        break;
      default:
        return state;
    }

    localStorage.setItem('cohortState', JSON.stringify(newState));

    if (payload.success) {
      payload.success(count);
    }

    return newState;
  } catch (error) {
    if (payload.error) {
      payload.error(error);
    }
    return state;
  }
};