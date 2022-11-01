import { AppStore, setupStore } from '../../store';
import { SIGN_IN, SIGN_UP, STATUS_IDLE, STATUS_LOADING } from '../../../constants/values';
import {
  addTodo,
  addTodoSuccess,
  removeTodo,
  removeTodoSuccess,
  setListSuccess,
  updateTodoStatus,
  updateTodoStatusSuccess,
  updateTodoText,
  updateTodoTextSuccess,
} from '../todosSlice';
import { signIn } from '../loginSlice';

describe('Test logins slice reducers', () => {
  jest.mock('redux-saga', () => () => ({ run: jest.fn() }));

  // @ts-ignore
  // global.fetch = jest.fn(() =>
  //   Promise.resolve({
  //     json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
  //   }),
  // );

  let store: AppStore;
  beforeEach(() => {
    store = setupStore();
  });

  test('Test setTodoList reducer case', () => {
    const testList = [
      { id: 'test id 1', text: 'test text 2', completed: false },
      { id: 'test id 1', text: 'test text 2', completed: true },
    ];
    store.dispatch(setListSuccess(testList));

    expect(store.getState().todos.todoList).toEqual(testList);
  });

  test('Test addTodoSuccess reducer case', () => {
    const testTodo = { id: 'test id 1', text: 'test text 2', completed: false };

    store.dispatch(addTodoSuccess(testTodo));

    expect(store.getState().todos.todoList.findIndex((todo) => todo.id === testTodo.id)).not.toBe(-1);
  });

  test('Test addTodo reducer case', () => {
    store.dispatch(
      addTodo({
        userId: 'test_id',
        todo: {
          text: 'test_text',
          completed: false,
        },
      }),
    );
    // store.dispatch(addTodo('test text 2', completed: false }));
    expect(store.getState().todos.status).toBe(STATUS_LOADING);
  });

  test('Test removeTodoSuccess reducer case', () => {
    const testTodo = { id: 'test id 1', text: 'test text 2', completed: false };

    store.dispatch(addTodoSuccess(testTodo));
    expect(store.getState().todos.todoList.findIndex((todo) => todo.id === testTodo.id)).not.toBe(-1);

    store.dispatch(removeTodoSuccess(testTodo.id));
    expect(store.getState().todos.todoList.findIndex((todo) => todo.id === testTodo.id)).toBe(-1);
  });

  test('Test removeTodo reducer case', () => {
    store.dispatch(
      removeTodo({
        userId: 'test_id',
        todoId: 'test_todo_id',
      }),
    );
    expect(store.getState().todos.status).toBe(STATUS_LOADING);
  });

  test('Test updateTodoStatusSuccess reducer case', () => {
    const testTodo = { id: 'test id 1', text: 'test text 2', completed: false };

    store.dispatch(addTodoSuccess(testTodo));
    expect(store.getState().todos.todoList.findIndex((todo) => testTodo.id)).not.toBe(-1);

    store.dispatch(updateTodoStatusSuccess(testTodo.id));

    expect(store.getState().todos.todoList.find((todo) => todo.id === testTodo.id)?.completed).toBe(true);
  });

  test('Test updateTodoStatus reducer case', () => {
    store.dispatch(
      updateTodoStatus({
        userId: 'test_id',
        todoId: 'test_todo_id',
        value: false,
      }),
    );
    expect(store.getState().todos.status).toBe(STATUS_LOADING);
  });

  test('Test updateTodoTextSuccess reducer case', () => {
    const testTodo = { id: 'test id 1', text: 'test text 2', completed: false };

    store.dispatch(addTodoSuccess(testTodo));
    expect(store.getState().todos.todoList.findIndex((todo) => testTodo.id)).not.toBe(-1);

    store.dispatch(updateTodoTextSuccess({ id: testTodo.id, text: 'EDITED TEXT' }));

    expect(store.getState().todos.todoList.find((todo) => todo.id === testTodo.id)?.text).toBe('EDITED TEXT');
  });

  test('Test updateTodoTest reducer case', () => {
    store.dispatch(
      updateTodoText({
        userId: 'test_id',
        todoId: 'test_todo_id',
        text: 'edit_test_text',
      }),
    );
    expect(store.getState().todos.status).toBe(STATUS_LOADING);
  });
});
