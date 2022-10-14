import { takeEvery, call, put } from 'redux-saga/effects';
import { postTodo, deleteTodo, editTodo, setTodoStatus } from '../services/services';
import {
  addTodoSuccess,
  removeTodoSuccess,
  updateTodoStatusSuccess,
  updateTodoTextSuccess,
} from '../store/slices/todosSlice';
import { logout } from '../store/slices/loginSlice';

function* workerAddTodo(action) {
  try {
    const { todo, userId } = action.payload;
    const res = yield call(() => postTodo(userId, todo));
    todo.id = res;

    yield put(addTodoSuccess(todo));
  } catch (error) {
    console.log(error.message);
    yield put(logout());
  }
}

function* workerRemoveTodo(action) {
  try {
    const res = yield call(() => deleteTodo(action.payload.userId, action.payload.todoId));
    console.log('RES Delete', res);
    yield put(removeTodoSuccess(res));
  } catch (error) {
    console.log(error.message);
    yield put(logout());
  }
}

function* workerUpdateTodoStatus(action) {
  try {
    const res = yield call(() => setTodoStatus(action.payload.userId, action.payload.todoId, action.payload.value));
    yield put(updateTodoStatusSuccess(res));
  } catch (error) {
    console.log(error.message);
    yield put(logout());
  }
}

function* workerUpdateTodoText(action) {
  try {
    const res = yield call(() => editTodo(action.payload.userId, action.payload.todoId, action.payload.text));
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
