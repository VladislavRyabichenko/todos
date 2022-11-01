import { takeEvery, call, put } from 'redux-saga/effects';
import { postTodo, deleteTodo, editTodo, setTodoStatus } from '../services/services';
import {
  addTodoSuccess,
  removeTodoSuccess,
  updateTodoStatusSuccess,
  updateTodoTextSuccess,
} from '../store/slices/todosSlice';
import {
  AddTodoActionType,
  RemoveTodoActionType,
  UpdateTodoTextActionType,
  UpdateTodoStatusActionType,
} from '../types/reduxTypes/todosSlice/todosSliceTypes';

import { logout } from '../store/slices/loginSlice';
import { PayloadAction } from '@reduxjs/toolkit';

function* workerAddTodo(action: PayloadAction<AddTodoActionType>): any {
  try {
    const { todo, userId } = action.payload;
    const res = yield call(() => postTodo(userId, todo));
    todo.id = res;
    console.log('RES POST', todo);
    yield put(addTodoSuccess(todo));
  } catch (error) {
    console.log(error.message);
    yield put(logout());
  }
}

function* workerRemoveTodo(action: PayloadAction<RemoveTodoActionType>): any {
  const { userId, todoId } = action.payload;
  try {
    const res = yield call(() => deleteTodo(userId, todoId));
    console.log('RES Delete', res);
    yield put(removeTodoSuccess(res));
  } catch (error) {
    console.log(error.message);
    yield put(logout());
  }
}

function* workerUpdateTodoStatus(action: PayloadAction<UpdateTodoStatusActionType>): any {
  const { userId, todoId, value } = action.payload;
  try {
    const res = yield call(() => setTodoStatus(userId, todoId, value));
    yield put(updateTodoStatusSuccess(res));
  } catch (error) {
    console.log(error.message);
    yield put(logout());
  }
}

function* workerUpdateTodoText(action: PayloadAction<UpdateTodoTextActionType>): any {
  const { userId, todoId, text } = action.payload;
  try {
    const res = yield call(() => editTodo(userId, todoId, text));
    yield put(updateTodoTextSuccess(res));
  } catch (error) {
    console.log(error.message);
    yield put(logout());
  }
}

function* todosSaga() {
  yield takeEvery('todos/addTodo', workerAddTodo);
  yield takeEvery('todos/removeTodo', workerRemoveTodo);
  yield takeEvery('todos/updateTodoStatus', workerUpdateTodoStatus);
  yield takeEvery('todos/updateTodoText', workerUpdateTodoText);
}

export default todosSaga;
