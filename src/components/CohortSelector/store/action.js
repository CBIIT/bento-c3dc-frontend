export const actionTypes = {
  CREATE_NEW_COHORT: 'CREATE_NEW_COHORT',
  MUTATE_SINGLE_COHORT: 'MUTATE_SINGLE_COHORT',
  DELETE_SINGLE_COHORT: 'DELETE_SINGLE_COHORT',
  DELETE_ALL_COHORT: 'DELETE_ALL_COHORT',
  ADD_PARTICIPANTS_TO_COHORT: 'ADD_PARTICIPANTS_TO_COHORT',
  DELETE_PARTICIPANTS_FROM_COHORT: 'DELETE_PARTICIPANTS_FROM_COHORT',
  
};

// Cohort actions.

/**
 * Action to create a new cohort.
 * @param {string} cohortId - The ID of the cohort.
 * @param {Array} participants - The participants to add to the cohort.
 * 
 * participants = [participant]
 * Each participant object should follow this template:
 * {
 *   participantId: string,
 *   participantName: string,
 *   participantEmail: string,
 * }
 */
export const onCreateNewCohort = (cohortId, cohortDescription, participants, success, error) => ({
  type: actionTypes.CREATE_NEW_COHORT,
  payload: { cohortId, cohortDescription, participants, success, error },
});

/**
 * Action to mutate a single cohort.
 * @param {string} cohortId - The ID of the cohort.
 * @param {Object} data - The data to update the cohort with.
 */
export const onMutateSingleCohort = (cohortId, data, success, error) => ({
  type: actionTypes.MUTATE_SINGLE_COHORT,
  payload: { cohortId, data, success, error},
});

/**
 * Action to delete a single cohort.
 * @param {string} cohortId - The ID of the cohort.
 */
export const onDeleteSingleCohort = (cohortId, success, error) => ({
  type: actionTypes.DELETE_SINGLE_COHORT,
  payload: { cohortId, success, error },
});

/**
 * Action to delete all cohorts.
 */
export const onDeleteAllCohort = (success, error) => ({
  type: actionTypes.DELETE_ALL_COHORT,
  payload: { success, error },
});

// Participants actions.

/**
 * Action to add participants to a cohort.
 * @param {string} cohortId - The ID of the cohort.
 * @param {Array} participants - The participants to add to the cohort.
 * 
 * participants = [participant]
 * Each participant object should follow this template:
 * {
 *   participantId: string,
 *   participantName: string,
 *   participantEmail: string,
 * }
 */
export const onAddParticipantsToCohort = (cohortId, participants, success, error) => ({
  type: actionTypes.ADD_PARTICIPANTS_TO_COHORT,
  payload: { cohortId, participants,success, error },
});

/**
 * Action to delete participants from a cohort.
 * @param {string} cohortId - The ID of the cohort.
 * @param {Array} participants - The participants to delete from the cohort.
 * 
 * participants = [participant]
 * Each participant object should follow this template:
 * {
 *   participantId: string,
 *   participantName: string,
 *   participantEmail: string,
 * }
 */
export const onDeleteParticipantsFromCohort = (cohortId, participants, success, error) => ({
  type: actionTypes.DELETE_PARTICIPANTS_FROM_COHORT,
  payload: { cohortId, participants, success, error },
});