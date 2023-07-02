import React, { createContext, useReducer } from 'react';
import authReducer from './reducers/auth';
import authInitialState from './initialStates/auth';

export const GlobalContext = createContext({});

const Provider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, authInitialState)

  return (
    <GlobalContext.Provider value={{ authState, authDispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default Provider;