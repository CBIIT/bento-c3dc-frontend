import React, { useState, useContext } from 'react';
import { CohortContext } from '../../components/CohortSelector/CohortContext.js';
import { actionTypes } from '../../components/CohortSelector/store/action.js'; 

const CohortManager = (props) => {
  const { state, dispatch } = useContext(CohortContext);

  // Local state for inputs
  const [cohortId, setCohortId] = useState('');
  const [participantId, setParticipantId] = useState('');
  const [selectedCohort, setSelectedCohort] = useState('');

  const handleCreateCohort = () => {
    if (!cohortId) return;
    dispatch({
      type: actionTypes.CREATE_NEW_COHORT,
      payload: { cohortId, participants: [] }, // Initialize with empty participants
    });
    setCohortId('');
  };

  const handleAddParticipant = () => {
    if (!participantId || !selectedCohort) return;
    dispatch({
      type: actionTypes.ADD_PARTICIPANTS_TO_COHORT,
      payload: { cohortId: selectedCohort, participants: [participantId] },
    });
    setParticipantId('');
  };

  const handleRemoveParticipant = (cohortId, participantId) => {
    dispatch({
      type: actionTypes.DELETE_PARTICIPANTS_FROM_COHORT,
      payload: { cohortId, participantIds: [participantId] },
    });
  };

  const handleDeleteCohort = (cohortId) => {
    dispatch({
      type: actionTypes.DELETE_COHORT,
      payload: { cohortId },
    });
  };

  return (
    <div style={{ width: '300px', margin: '0 auto' }}>
      <h2>Cohort Management</h2>

      <div>
        <h3>Create New Cohort</h3>
        <input
          type="text"
          value={cohortId}
          onChange={(e) => setCohortId(e.target.value)}
          placeholder="Enter Cohort ID"
        />
        <button onClick={handleCreateCohort}>Create Cohort</button>
      </div>

      <div>
        <h3>Manage Existing Cohorts</h3>
        <select
          value={selectedCohort}
          onChange={(e) => setSelectedCohort(e.target.value)}
        >
          <option value="">Select Cohort</option>
          {Object.keys(state).map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>

        <button onClick={() => handleDeleteCohort(selectedCohort)}>Delete Selected Cohort</button>

        {selectedCohort && (
          <>
            <h4>Add Participant to Cohort</h4>
            <input
              type="text"
              value={participantId}
              onChange={(e) => setParticipantId(e.target.value)}
              placeholder="Enter Participant ID"
            />
            <button onClick={handleAddParticipant}>Add Participant</button>

            <h4>Participants in {selectedCohort}</h4>
            <ul>
              {state[selectedCohort] && state[selectedCohort].map((id) => (
                <li key={id}>
                  {id}
                  <button onClick={() => handleRemoveParticipant(selectedCohort, id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default CohortManager;

