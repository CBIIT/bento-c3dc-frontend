import React, { createContext, useState } from 'react';

export const CohortModalContext = createContext();

export const CohortModalProvider = ({ children }) => {
  const [showCohortModal, setShowCohortModal] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [currentCohortChanges, setCurrentCohortChanges] = useState(null);

  return (
    <CohortModalContext.Provider value={{ showCohortModal, setShowCohortModal, warningMessage, setWarningMessage, currentCohortChanges, setCurrentCohortChanges }}>
      {children}
    </CohortModalContext.Provider>
  );
};
