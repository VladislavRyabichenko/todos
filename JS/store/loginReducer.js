const initialState = {
  isAuth: false,
  id: null,
  userLogin: null,
};

export const login = (state = initialState, action) => {
  switch (action.type) {
    case "login/setSignIn":
      state.isAuth = true;
      state.id = action.payload.id;
      state.userLogin = action.payload.login;
      return state;

    default:
      return state;
  }
};
