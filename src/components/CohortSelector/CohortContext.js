// CohortContext.js
import React, { createContext, useReducer } from 'react';
import { reducer, initialState } from './store/reducer';


const loggingMiddleware = (reducer) => {
  return (state, action) => {
    console.log('Action:', action);
    console.log('Previous State:', state);
    const newState = reducer(state, action);
    console.log('New State:', newState);
    return newState;
  };
};

// Create the context
export const CohortContext = createContext();

// Create the provider component
export const CohortProvider = ({ children }) => {
  const loadState = () => {
    const savedState = localStorage.getItem('cohortState');
    return savedState ? JSON.parse(savedState) : initialState;
  };

  const [state, dispatch] = useReducer(loggingMiddleware(reducer), loadState());

  return (
    <CohortContext.Provider value={{ state, dispatch }}>
      {children}
    </CohortContext.Provider>
  );
};
