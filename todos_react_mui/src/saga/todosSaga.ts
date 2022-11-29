import io, { Socket } from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { take, call, put, fork } from 'redux-saga/effects';
import {
  addTodoSuccess,
  removeTodoSuccess,
  setListSuccess,
  updateTodoStatusSuccess,
  updateTodoTextSuccess,
} from '../store/slices/todosSlice';
import { TodoType } from '../types/commonTypes/commonTypes';

function connect() {
  const userId: string = JSON.parse(window.localStorage.getItem('user-info'))?.['_id'];
  const token: string = window.localStorage.getItem('token-'.concat(userId));

  const socket = io('http://localhost:3000/', {
    auth: {
      userId: userId,
      token: token,
    },
  });

  return new Promise((resolve) => {
    socket.on('connect', () => {
      resolve(socket);
      console.log('Socket connected');
    });
  });
}

function* read(socket: Socket): any {
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    console.log('action', action);
    yield put(action);
  }
}

export function* subscribe(socket: Socket): any {
  // @ts-ignore
  return new eventChannel((emit: Function): any => {
    const setAllTodos = (list: TodoType[]) => {
      return emit(setListSuccess(list));
    };

    const addTodo = (todo: TodoType): void => {
      emit(addTodoSuccess(todo));
    };

    const deleteTodo = (todoId: string): void => {
      emit(removeTodoSuccess(todoId));
    };
    const updateStatus = (todoId: any): void => {
      emit(updateTodoStatusSuccess(todoId));
    };

    const editTodo = (payload: any): void => {
      emit(updateTodoTextSuccess(payload));
    };

    socket.on('todo.allTodos', setAllTodos);
    socket.on('todo.new', addTodo);
    socket.on('todo.deleted', deleteTodo);
    socket.on('todo.statusUpdated', updateStatus);
    socket.on('todo.todoEdited', editTodo);
    return () => {};
  });
}

export function* setListWorker(socket: Socket) {
  while (true) {
    const { payload } = yield take('todos/setList');
    socket.emit('todo.getAllTodos', payload);
  }
}

export function* addTodoWorker(socket: Socket) {
  while (true) {
    const { payload } = yield take('todos/addTodo');
    socket.emit('todo.add', payload.userId, payload.todo);
  }
}
export function* deleteTodoWorker(socket: Socket) {
  while (true) {
    const { payload } = yield take('todos/removeTodo');
    socket.emit('todo.delete', payload.userId, payload.todoId);
  }
}
export function* updateTodoStatusWorker(socket: Socket) {
  while (true) {
    const { payload } = yield take('todos/updateTodoStatus');
    const { userId, todoId, value } = payload;
    socket.emit('todo.updateStatus', userId, todoId, value);
  }
}

export function* editTodoWorker(socket: Socket) {
  while (true) {
    const { payload } = yield take('todos/updateTodoText');
    const { userId, todoId, text } = payload;
    socket.emit('todo.editTodo', userId, todoId, text);
  }
}

export function* flow(): any {
  const socket = yield call(connect);

  yield fork(setListWorker, socket);
  yield fork(read, socket);
  yield fork(addTodoWorker, socket);
  yield fork(deleteTodoWorker, socket);
  yield fork(updateTodoStatusWorker, socket);
  yield fork(editTodoWorker, socket);
}

export default flow;
