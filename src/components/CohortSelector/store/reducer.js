// reducer.js
export const initialState = {
  };
  

const createNewCohort = (state, payload) => {
    const { cohortId, participants } = payload;

    // Check if cohortId already exists in the state
    if (state[cohortId]) {
        return state; // Return the existing state as no changes are made
    }

    // Create a new cohort with the given ID and participants
    const newState = {
        ...state,
        [cohortId]: participants,
    };

    return newState; // Return the updated state
};

const addParticipantsToCohort = (state, payload) => {
    const { cohortId, participants } = payload;
  
    // Check if the cohortId exists
    if (!state[cohortId]) {
      return state; // Return the existing state if cohort is not found
    }
  
    // Add new participants to the existing cohort, avoiding duplicates
    const updatedParticipants = [
      ...new Set([...state[cohortId], ...participants])
    ];
  
    const newState = {
      ...state,
      [cohortId]: updatedParticipants,
    };

    return newState; // Return updated state
  };

const removeParticipantsFromCohort = (state, payload) => {
    const { cohortId, participantIds } = payload;

    // Check if the cohort exists in the state
    if (!state[cohortId]) {
    return state; // Return the existing state as no changes are made
    }

    // Filter out the participants that are to be deleted
    const updatedParticipants = state[cohortId].filter(
    (participant) => !participantIds.includes(participant)
    );

    // Create a new state with the updated participants for the cohort
    const newState = {
    ...state,
    [cohortId]: updatedParticipants,
    };

    return newState; // Return updated state
};

const deleteCohort = (state, payload) => {
    const { cohortId } = payload;
  
    // Check if the cohort exists in the state
    if (!state[cohortId]) {
      return state; // Return the existing state as no changes are made
    }
  
    // Create a new state without the specified cohort
    const { [cohortId]: removedCohort, ...newState } = state;
    return newState; // Return updated state
  };
  
export const reducer = (state, action) => {
    const {type, payload} = action;
    let newState;

    switch (type) {
        case 'CREATE_NEW_COHORT':
            newState = createNewCohort(state, payload);
        break;
        case 'ADD_PARTICIPANTS_TO_COHORT':
            newState = addParticipantsToCohort(state, payload);;
        break;
        case 'REMOVE_PARTICIPANTS_FROM_COHORT':
            newState = removeParticipantsFromCohort(state, payload);
        break;
        case 'DELETE_COHORT':
            newState = deleteCohort(state, payload);
        break;
        default:
        return state;
    }

    // Save the updated state to localStorage
    localStorage.setItem('cohortState', JSON.stringify(newState));

    return newState;
};
  