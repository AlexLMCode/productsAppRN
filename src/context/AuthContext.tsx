import React, { createContext, useReducer} from 'react';
import {Usuario} from '../interfaces/appInterfaces';
import {authReducer} from './AuthReducer';
import {AuthState} from './authReducer';

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  signUp: () => void;
  signIn: () => void;
  signOut: () => void;
  removeError: () => void;
};

const AuthInitialState: AuthState = {
  status: 'checking',
  token: null,
  user: null,
  errorMessage: '',
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {

  const [state, dispatch] = useReducer(authReducer, AuthInitialState);

  const signUp= () => ();
  const signIn= () => ();
  const signOut= () => ();
  const removeError= () => ();

  return <AuthContext.Provider value={{
    ...state,
    signUp,
    signIn,
    signOut,
    removeError
  }}>{children}</AuthContext.Provider>;
};
