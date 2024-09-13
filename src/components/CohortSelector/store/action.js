export const actionTypes = {
  CREATE_NEW_COHORT: 'CREATE_NEW_COHORT',
  ADD_PARTICIPANTS_TO_COHORT: 'ADD_PARTICIPANTS_TO_COHORT',
  DELETE_PARTICIPANTS_FROM_COHORT: 'DELETE_PARTICIPANTS_FROM_COHORT',
  DELETE_COHORT: 'DELETE_COHORT',
};

export const onCreateNewCohort = (cohortId, participants) => ({
  type: actionTypes.CREATE_NEW_COHORT,
  payload: { cohortId, participants },
});

export const onAddParticipantsToCohort = (cohortId, participants) => ({
  type: actionTypes.ADD_PARTICIPANTS_TO_COHORT,
  payload: { cohortId, participants },
});

export const onDeleteParticipantsFromCohort = (cohortId, participantIds) => ({
  type: actionTypes.DELETE_PARTICIPANTS_FROM_COHORT,
  payload: { cohortId, participantIds },
});

export const onDeleteCohort = (cohortId) => ({
  type: actionTypes.DELETE_COHORT,
  payload: { cohortId },
});
