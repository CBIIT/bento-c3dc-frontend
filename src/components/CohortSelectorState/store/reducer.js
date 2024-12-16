import _ from "lodash";

export const initialState = {
};

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

  if(Object.keys(state).length >= 20){
    throw new Error(`You cannot create more than 20 cohorts`)
  }

  // If no cohortId is provided, default to "New Cohort"
  if (!cohortId) {
    cohortId = "New Cohort";
    let counter = 1;

    // Increment the cohort name if it already exists
    while (state[cohortId]) {
      cohortId = `New Cohort ${counter}`;
      counter++;
    }
  }

  if (!cohortName) {
    cohortName = cohortId;
  }

  if (state[cohortId]) {
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
    [cohortId]: newCohort,
  };

  return {newState, count: participants.length};
};

const addParticipantsToCohort = (state, payload, ) => {
  const { cohortId, participants } = payload;

  if (!state[cohortId]) {
    throw new Error(`Cohort with ID ${cohortId} does not exist`);
  }

  // Get existing participant PKs
  const existingParticipantPks = new Set(state[cohortId].participants.map(p => p.participant_pk));

  // Filter out participants with duplicate PKs
  const newParticipants = participants.filter(p => !existingParticipantPks.has(p.participant_pk));

  const updatedParticipants = [
    ...state[cohortId].participants,
    ...newParticipants
  ];

  const newCohort = {
    ...state[cohortId],
    participants: updatedParticipants,
    lastUpdated: new Date().toISOString(),
  };

  if (!isValidCohort(newCohort)) {
    throw new Error('Invalid cohort data');
  }

  const newState = {
    ...state,
    [cohortId]: newCohort,
  };

  return {newState, count: newParticipants.length};
};

const mutateSingleCohort = (state, payload) => {
  const { cohortId, data } = payload;
  const { cohortName } = data;

  if (!state[cohortId]) {
    throw new Error(`Cohort with ID ${cohortId} does not exist`);
  }

  const newCohort = {
    ...state[cohortId],
    ...data,
    cohortName: cohortName || state[cohortId].cohortName,
    lastUpdated: new Date().toISOString(),
  };

  if (!isValidCohort(newCohort)) {
    throw new Error('Invalid cohort data');
  }

  let newState = { ...state };

  // Check if cohortName is different from cohortId
  //normalize the name as an ID by removing trailing and leading spaces and case sensitivity.
  const newCleanCohortID = cohortName.trim().toLowerCase();

  if (newCleanCohortID && newCleanCohortID !== cohortId) {
    // Create a new entry with the new cohort ID
    if (state[newCleanCohortID]) {
      throw new Error(`Cohort with Name ${cohortName} already exists, please choose a different name`);
    }
    newCohort.cohortId = newCleanCohortID;
    newState[newCleanCohortID] = newCohort;
    // Delete the old entry
    delete newState[cohortId];
  } else {
    newState[cohortId] = newCohort;
  }

  return newState;
};

const deleteSingleCohort = (state, payload) => {
  const { cohortId } = payload;

  if (!state[cohortId]) {
    throw new Error(`Cohort with ID ${cohortId} does not exist`);
  }

  const { [cohortId]: removedCohort, ...newState } = state;
  return newState;
};

const deleteAllCohort = (state) => {
  return {};
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