const initialState = {
  isAuth: false,
  id: null,
};

export const login = (state = initialState, action) => {
  switch (action.type) {
    case "login/setSignIn":
      return {
        ...state,
        isAuth: true,
        id: action.payload.id,
      };
    case "login/signOut":
      return {
        ...state,
        isAuth: false,
        id: null,
      };

    default:
      return state;
  }
};
