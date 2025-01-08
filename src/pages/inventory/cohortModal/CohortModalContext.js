import React, { createContext, useState } from 'react';

export const CohortModalContext = createContext();

export const CohortModalProvider = ({ children }) => {
  const [showCohortModal, setShowCohortModal] = useState(false);

  return (
    <CohortModalContext.Provider value={{ showCohortModal, setShowCohortModal }}>
      {children}
    </CohortModalContext.Provider>
  );
};
