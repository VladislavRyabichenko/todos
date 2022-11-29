import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { STATUS_IDLE, STATUS_LOADING } from '../../constants/values';
import { RootState } from '../store';
import * as socketIO from 'socket.io-client';
// const socket = socketIO.connect('http://localhost:3000');

import {
  TodoStateType,
  AddTodoActionType,
  RemoveTodoActionType,
  UpdateTodoTextActionType,
  UpdateTodoTextSuccessActionType,
  UpdateTodoStatusActionType,
  SetListActionSuccessType,
} from '../../types/reduxTypes/todosSlice/todosSliceTypes';
import { TodoType } from '../../types/commonTypes/commonTypes';

const initialState: TodoStateType = {
  todoList: [],
  status: STATUS_IDLE,
};

export const selectList = (state: RootState) => state.todos.todoList;
export const selectTodoStatus = (state: RootState) => state.todos.status;

const NAME: string = 'todos';
export const todosSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<string>) => {
      state.status = STATUS_LOADING;
    },
    setListSuccess: (state, action: PayloadAction<SetListActionSuccessType>) => {
      state.status = STATUS_IDLE;
      state.todoList = [...action.payload];
    },
    addTodo: (state, action: PayloadAction<AddTodoActionType>) => {
      state.status = STATUS_LOADING;
    },
    addTodoSuccess: (state, action: PayloadAction<TodoType>) => {
      state.status = STATUS_IDLE;
      state.todoList = [...state.todoList, action.payload];
    },

    removeTodo: (state, action: PayloadAction<RemoveTodoActionType>) => {
      state.status = STATUS_LOADING;
    },

    removeTodoSuccess: (state, action: PayloadAction<string>) => {
      state.status = STATUS_IDLE;
      state.todoList = state.todoList.filter((todo) => todo.id !== action.payload);
    },

    updateTodoStatus: (state, action: PayloadAction<UpdateTodoStatusActionType>) => {
      state.status = STATUS_LOADING;
    },

    updateTodoStatusSuccess: (state, action: PayloadAction<string>) => {
      state.status = STATUS_IDLE;
      state.todoList = state.todoList.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo,
      );
    },

    updateTodoText: (state, action: PayloadAction<UpdateTodoTextActionType>) => {
      state.status = STATUS_LOADING;
    },

    updateTodoTextSuccess: (state, action: PayloadAction<UpdateTodoTextSuccessActionType>) => {
      state.status = STATUS_IDLE;
      state.todoList = state.todoList.map((todo) =>
        todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo,
      );
    },
  },
});

let socket: any;
const connect = () => {
  socket = socketIO.connect('http://localhost:3000');
  return new Promise((resolve) => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
};

const disconnect = () => {
  socket = socketIO.connect('http://localhost:3000');
  return new Promise((resolve) => {
    socket.on('disconnect', () => {
      resolve(socket);
    });
  });
};

const reconnect = () => {
  socket = socketIO.connect('http://localhost:3000');
  return new Promise((resolve) => {
    socket.on('reconnect', () => {
      resolve(socket);
    });
  });
};

export const {
  setList,
  setListSuccess,
  addTodo,
  addTodoSuccess,
  removeTodo,
  removeTodoSuccess,
  updateTodoStatus,
  updateTodoStatusSuccess,
  updateTodoText,
  updateTodoTextSuccess,
} = todosSlice.actions;
export default todosSlice.reducer;
