// CohortComponent.js
import React, { useContext, useState } from 'react';
import { CohortContext } from '../../components/CohortSelector/CohortContext.js';

const CohortComponent = () => {
  const { state, dispatch } = useContext(CohortContext);
  const [participantName, setParticipantName] = useState('');

  const addParticipant = () => {
    const newParticipant = {
      id: Date.now(),
      name: participantName,
    };
    dispatch({ type: 'ADD_PARTICIPANT', payload: newParticipant });
    setParticipantName('');
  };

  const removeParticipant = (participantID) => {
    dispatch({ type: 'REMOVE_PARTICIPANT', payload: participantID });
  };

  return (
    <div>
      <h2>Cohort: {state.cohort || 'No cohort selected'}</h2>

      <input
        type="text"
        value={participantName}
        onChange={(e) => setParticipantName(e.target.value)}
        placeholder="Add participant"
      />
      <button onClick={addParticipant}>Add Participant</button>

      <h3>Participants:</h3>
      <ul>
        {state.participants.map((p) => (
          <div>
            <li key={p.id}>{p.name}</li>
            <button onClick={() => removeParticipant(p.id)}>Remove</button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default CohortComponent;
