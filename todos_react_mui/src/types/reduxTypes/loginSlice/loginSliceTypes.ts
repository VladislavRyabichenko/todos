// STATE
export type LoginStateType = {
  isAuth: boolean;
  id: string | null;
  status: string;
  currentSection: string;
  login: string | null;

  error: {
    active: boolean;
    message: string;
  };
};

// ACTIONS
export type signInActionType = {
  login: string;
  password: string;
};

export type signInSuccessActionType = {
  user: {
    login: string;
    _id: string;
    password: string;
  };
  token: string;
};

export type registerUserActionType = {
  login: string;
  password: string;
};

export type ErrorActionType = {
  active: boolean;
  message: string;
};

export type SectionActionType = {
  section: string;
};
