import React, { createContext, useState } from 'react';

export const CohortModalContext = createContext();

export const CohortModalProvider = ({ children }) => {
  const [showCohortModal, setShowCohortModal] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  return (
    <CohortModalContext.Provider value={{ showCohortModal, setShowCohortModal, warningMessage, setWarningMessage }}>
      {children}
    </CohortModalContext.Provider>
  );
};
