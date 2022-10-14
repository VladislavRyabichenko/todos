import { createSlice } from '@reduxjs/toolkit';

export const saveInLocalStorage = (id, data) => {
  window.localStorage.setItem(id, data);
};
export const clearLocalStorage = (id) => window.localStorage.removeItem(id);

const initialState = {
  isAuth: false,
  id: null,
  status: 'idle',
  currentSection: 'sign', // sign || register

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
      state.status = 'loading';
    },
    signInSuccess: (state, action) => {
      state.status = 'idle';
      state.isAuth = true;
      console.log(action);
      state.id = action.payload.user._id;
      saveInLocalStorage('token-'.concat(action.payload.user._id), action.payload.token);
      saveInLocalStorage('user-info', JSON.stringify(action.payload.user));
    },

    registerUser: (state) => {
      state.status = 'loading';
    },
    registerUserSuccess: (state) => {
      state.status = 'idle';
      state.currentSection = 'sign';
    },

    logout: (state) => {
      clearLocalStorage('token-'.concat(state.id));
      clearLocalStorage('user-info');
      state.isAuth = false;
      state.id = null;
      state.status = 'idle';
      state.currentSection = 'sign';
    },

    setLoginError: (state, action) => {
      state.status = 'idle';
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
