import { TodoType } from '../commonTypes/commonTypes';

export type UserData = {
  _id: string;
  login: string;
  password: string;
  todos: TodoType[];
};
export type SignInUserDataType = {
  status: string;
  message: string;
  data: {
    user: UserData;
    token: string;
  } | null;
};

export type ResisterUserDataType = {
  status: string;
  message: string;
  data: null;
};

export type TodosResponseDataType = {
  status: string;
  message: string;
  data: {
    todoId: string;
  };
};
