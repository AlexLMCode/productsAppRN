import React, {createContext, useEffect, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import cafeApi from '../api/cafeApi';
import {
  LoginData,
  LoginResponse,
  RegisterData,
  Usuario,
} from '../interfaces/appInterfaces';
import {authReducer} from './authReducer';
import {AuthState} from './authReducer';

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  signUp: (signUpData: RegisterData) => void;
  signIn: (loginData: LoginData) => void;
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
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log('entra al checking token');

    //No token not authenticated
    if (!token) {
      return dispatch({type: 'notAuthenticated'});
    } else {
      //check if the token is valid
      const resp = await cafeApi.get('/auth');
      if (resp.status !== 200) {
        return dispatch({type: 'notAuthenticated'});
      }
      await AsyncStorage.setItem('token', resp.data.token);

      dispatch({
        type: 'signUp',
        payload: {
          token: resp.data.token,
          user: resp.data.usuario,
        },
      });
    }
  };

  const signUp = async ({correo, nombre, password}: RegisterData) => {
    try {
      const resp = await cafeApi.post<LoginResponse>('/usuarios', {
        correo,
        nombre,
        password,
      });
      console.log('Sign up: ', resp.data);
      dispatch({
        type: 'signUp',
        payload: {
          token: resp.data.token,
          user: resp.data.usuario,
        },
      });
      await AsyncStorage.setItem('token', resp.data.token);
    } catch (error: any) {
      console.log(error.response.data.msg);
      dispatch({
        type: 'addError',
        payload: error.response.data.errors[0].msg || 'Revise la informacion',
      });
    }
  };

  const signIn = async ({correo, password}: LoginData) => {
    try {
      const resp = await cafeApi.post<LoginResponse>('/auth/login', {
        correo,
        password,
      });
      console.log(resp.data);
      dispatch({
        type: 'signUp',
        payload: {
          token: resp.data.token,
          user: resp.data.usuario,
        },
      });
      await AsyncStorage.setItem('token', resp.data.token);
    } catch (error: any) {
      console.log(error.response.data.msg);
      dispatch({
        type: 'addError',
        payload: error.response.data.msg || 'Informacion incorrecta',
      });
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('token');
    dispatch({type: 'logOut'});
  };
  const removeError = () => {
    dispatch({type: 'removeError'});
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUp,
        signIn,
        signOut,
        removeError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
