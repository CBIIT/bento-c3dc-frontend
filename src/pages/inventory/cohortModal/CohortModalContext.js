import React, { createContext, useState } from 'react';

export const CohortModalContext = createContext();

export const CohortModalProvider = ({ children }) => {
  const [showCohortModal, setShowCohortModal] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [currentCohortChanges, setCurrentCohortChanges] = useState(null);

  const contextValue = {
    showCohortModal,
    setShowCohortModal,
    warningMessage,
    setWarningMessage,
    currentCohortChanges,
    setCurrentCohortChanges
  };

  return (
    <CohortModalContext.Provider value={contextValue}>
      {children}
    </CohortModalContext.Provider>
  );
};
