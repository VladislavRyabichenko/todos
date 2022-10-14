import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todoList: [],
  status: 'loading',
};

export const selectList = (state) => state.todos.todoList;
export const selectTodoStatus = (state) => state.todos.status;
export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setList: (state) => {
      state.status = 'loading';
    },
    setListSuccess: (state, action) => {
      state.status = 'idle';
      state.todoList = [...action.payload];
    },
    addTodo: (state) => {
      state.status = 'loading';
    },
    addTodoSuccess: (state, action) => {
      state.status = 'idle';
      state.todoList = [...state.todoList, action.payload];
    },

    removeTodo: (state) => {
      state.status = 'loading';
    },

    removeTodoSuccess: (state, action) => {
      state.status = 'idle';
      state.todoList = state.todoList.filter((todo) => todo.id !== action.payload);
    },

    updateTodoStatus: (state) => {
      state.status = 'loading';
    },

    updateTodoStatusSuccess: (state, action) => {
      state.status = 'idle';
      state.todoList = state.todoList.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    },

    updateTodoText: (state) => {
      state.status = 'loading';
    },

    updateTodoTextSuccess: (state, action) => {
      state.status = 'idle';
      state.todoList = state.todoList.map((todo) =>
        todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
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
