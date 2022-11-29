import { TodoType } from '../../commonTypes/commonTypes';

// STATE
export type TodoStateType = {
  todoList: TodoType[];
  status: string;
};

//ACTIONS
export type SetListActionSuccessType = Array<TodoType>;

export type AddTodoActionType = {
  userId: string;
  todo: TodoType;
};

export type RemoveTodoActionType = {
  userId: string;
  todoId: string;
};

export type UpdateTodoTextActionType = {
  todoId: string;
  userId: string;
  text: string;
};

export type UpdateTodoStatusActionType = {
  todoId: string;
  userId: string;
  value: boolean;
};

export type UpdateTodoTextSuccessActionType = {
  id: string;
  text: string;
};
