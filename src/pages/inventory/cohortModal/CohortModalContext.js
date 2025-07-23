import React, { createContext, useState, useCallback } from 'react';

export const CohortModalContext = createContext();

export const CohortModalProvider = ({ children }) => {
  const [showCohortModal, setShowCohortModal] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [currentCohortChanges, setCurrentCohortChanges] = useState(null);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [selectedCohort, setSelectedCohort] = useState(null);

  const showAlert = useCallback((type, message, duration = 2500) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert({ type: '', message: '' });
    }, duration);
  }, []);

  const clearAlert = useCallback(() => {
    setAlert({ type: '', message: '' });
  }, []);

  const clearCurrentCohortChanges = useCallback(() => {
    setCurrentCohortChanges(null);
  }, []);

  const contextValue = {
    showCohortModal,
    setShowCohortModal,
    warningMessage,
    setWarningMessage,
    currentCohortChanges,
    setCurrentCohortChanges,
    alert,
    showAlert,
    clearAlert,
    selectedCohort,
    setSelectedCohort,
    clearCurrentCohortChanges
  };

  return (
    <CohortModalContext.Provider value={contextValue}>
      {children}
    </CohortModalContext.Provider>
  );
};
