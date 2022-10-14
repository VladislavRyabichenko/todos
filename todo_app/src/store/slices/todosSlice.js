import { createSlice } from '@reduxjs/toolkit';
import { STATUS_IDLE, STATUS_LOADING } from '../../constants/values';

const initialState = {
  todoList: [],
  status: STATUS_LOADING,
};

export const selectList = (state) => state.todos.todoList;
export const selectTodoStatus = (state) => state.todos.status;
export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setList: (state) => {
      state.status = STATUS_LOADING;
    },
    setListSuccess: (state, action) => {
      state.status = STATUS_IDLE;
      state.todoList = [...action.payload];
    },
    addTodo: (state) => {
      state.status = STATUS_LOADING;
    },
    addTodoSuccess: (state, action) => {
      state.status = STATUS_IDLE;
      state.todoList = [...state.todoList, action.payload];
    },

    removeTodo: (state) => {
      state.status = STATUS_LOADING;
    },

    removeTodoSuccess: (state, action) => {
      state.status = STATUS_IDLE;
      state.todoList = state.todoList.filter((todo) => todo.id !== action.payload);
    },

    updateTodoStatus: (state) => {
      state.status = STATUS_LOADING;
    },

    updateTodoStatusSuccess: (state, action) => {
      state.status = STATUS_IDLE;
      state.todoList = state.todoList.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo,
      );
    },

    updateTodoText: (state) => {
      state.status = STATUS_LOADING;
    },

    updateTodoTextSuccess: (state, action) => {
      state.status = STATUS_IDLE;
      state.todoList = state.todoList.map((todo) =>
        todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo,
      );
    },
  },
});

export const {
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
