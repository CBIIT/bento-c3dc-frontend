// CohortContext.js
import React, { createContext, useReducer } from 'react';
import { reducer, initialState } from './store/reducer';
import logger from 'use-reducer-logger';

// Create the context
export const CohortStateContext = createContext();

// Create the provider component
export const CohortStateProvider = ({ children }) => {
  const loadState = () => {
    const savedState = localStorage.getItem('cohortState');
    return savedState ? JSON.parse(savedState) : initialState;
  };

  const [state, dispatch] = useReducer(logger(reducer), loadState());

  return (
    <CohortStateContext.Provider value={{ state, dispatch }}>
      {children}
    </CohortStateContext.Provider>
  );
};
