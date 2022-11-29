import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SIGN_IN, STATUS_IDLE, STATUS_LOADING } from '../../constants/values';
import { RootState } from '../store';

import {
  LoginStateType,
  SectionActionType,
  signInActionType,
  signInSuccessActionType,
  ErrorActionType,
  registerUserActionType,
} from '../../types/reduxTypes/loginSlice/loginSliceTypes';

export const saveInLocalStorage = (id: string, data: any): void => {
  window.localStorage.setItem(id, data);
};
export const clearLocalStorage = (id: string): void => window.localStorage.removeItem(id);

const initialState: LoginStateType = {
  isAuth: false,
  id: null,
  status: STATUS_IDLE,
  currentSection: SIGN_IN,
  login: null,

  error: {
    active: false,
    message: '',
  },
};

const NAME: string = 'login';

export const selectId = (state: RootState) => state.login.id;
export const selectLogin = (state: RootState) => state.login.login;
export const selectStatus = (state: RootState) => state.login.status;
export const selectIsAuth = (state: RootState) => state.login.isAuth;
export const selectLoginError = (state: RootState) => state.login.error;
export const selectLoginSection = (state: RootState) => state.login.currentSection;

export const loginSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<signInActionType>) => {
      state.status = STATUS_LOADING;
    },
    signInSuccess: (state, action: PayloadAction<signInSuccessActionType>) => {
      state.status = STATUS_IDLE;
      state.isAuth = true;
      state.login = action.payload.user.login;
      console.log(action);
      state.id = action.payload.user._id;
      saveInLocalStorage('token-'.concat(action.payload.user._id), action.payload.token);
      saveInLocalStorage('user-info', JSON.stringify(action.payload.user));
    },

    registerUser: (state, action: PayloadAction<registerUserActionType>) => {
      state.status = STATUS_LOADING;
    },
    registerUserSuccess: (state) => {
      state.status = STATUS_IDLE;
      state.currentSection = SIGN_IN;
    },

    logout: (state) => {
      clearLocalStorage('token-'.concat(state.id));
      clearLocalStorage('user-info');
      state.isAuth = false;
      state.id = null;
      state.status = STATUS_IDLE;
      state.currentSection = SIGN_IN;
      state.login = null;
    },

    setLoginError: (state, action: PayloadAction<ErrorActionType>) => {
      state.status = STATUS_IDLE;
      state.error.active = action.payload.active;
      state.error.message = action.payload.message;
    },

    setCurrentSection: (state, action: PayloadAction<SectionActionType>) => {
      state.currentSection = action.payload.section;
    },
  },
});

export const { signIn, signInSuccess, registerUser, registerUserSuccess, setLoginError, setCurrentSection, logout } =
  loginSlice.actions;
export default loginSlice.reducer;
