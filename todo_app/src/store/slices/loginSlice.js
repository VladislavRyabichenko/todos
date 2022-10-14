import { createSlice } from '@reduxjs/toolkit';
import { STATUS_IDLE, STATUS_LOADING, SIGN_IN } from '../../constants/values';

export const saveInLocalStorage = (id, data) => {
  window.localStorage.setItem(id, data);
};
export const clearLocalStorage = (id) => window.localStorage.removeItem(id);

const initialState = {
  isAuth: false,
  id: null,
  status: STATUS_IDLE,
  currentSection: SIGN_IN,

  error: {
    active: false,
    message: '',
  },
};

const NAME = 'login';

export const selectId = (state) => state.login.id;
export const selectStatus = (state) => state.login.status;
export const selectIsAuth = (state) => state.login.isAuth;
export const selectLoginError = (state) => state.login.error;
export const selectLoginSection = (state) => state.login.currentSection;

export const loginSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    signIn: (state) => {
      state.status = STATUS_LOADING;
    },
    signInSuccess: (state, action) => {
      state.status = STATUS_IDLE;
      state.isAuth = true;
      state.id = action.payload.user._id;
      saveInLocalStorage('token-'.concat(action.payload.user._id), action.payload.token);
      saveInLocalStorage('user-info', JSON.stringify(action.payload.user));
    },

    registerUser: (state) => {
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
    },

    setLoginError: (state, action) => {
      state.status = STATUS_IDLE;
      state.error.active = action.payload.active;
      state.error.message = action.payload.message;
    },

    setCurrentSection: (state, action) => {
      state.currentSection = action.payload.section;
    },
  },
});

export const { signIn, signInSuccess, registerUser, registerUserSuccess, setLoginError, setCurrentSection, logout } =
  loginSlice.actions;
export default loginSlice.reducer;
