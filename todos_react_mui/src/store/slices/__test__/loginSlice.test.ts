import { AppStore, setupStore } from '../../store';
import { SIGN_IN, SIGN_UP, STATUS_IDLE, STATUS_LOADING } from '../../../constants/values';
import {
  logout,
  registerUserSuccess,
  setCurrentSection,
  setLoginError,
  signIn,
  signInSuccess,
  registerUser,
} from '../loginSlice';

describe('Test logins slice reducers', () => {
  let store: AppStore;
  beforeEach(() => {
    store = setupStore();
  });

  jest.mock('redux-saga', () => () => ({ run: jest.fn() }));

  test('Test signInCase', () => {
    store.dispatch(signIn({ login: 'login', password: 'password' }));
    expect(store.getState().login.status).toBe(STATUS_LOADING);
  });

  test('Test signInSuccess reducer case', () => {
    store.dispatch(
      signInSuccess({
        user: {
          login: 'test_login',
          _id: 'test_id',
          password: 'test_password',
        },
        token: 'test_token',
      }),
    );

    expect(store.getState().login.login).toBe('test_login');
    expect(store.getState().login.id).toBe('test_id');
    expect(store.getState().login.isAuth).toBe(true);
  });

  test('Test registerUser reducer case', () => {
    store.dispatch(registerUser({ login: 'login', password: 'password' }));
    expect(store.getState().login.status).toBe(STATUS_LOADING);
  });

  test('Test registerUserSuccess reducer case', () => {
    store.dispatch(registerUserSuccess());

    expect(store.getState().login.status).toBe(STATUS_IDLE);
    expect(store.getState().login.currentSection).toBe(SIGN_IN);
  });

  test('Test setCurrentSection reducer case', () => {
    store.dispatch(setCurrentSection({ section: SIGN_UP }));
    expect(store.getState().login.currentSection).toBe(SIGN_UP);
  });

  test('Test signInSuccess logout reducer case', () => {
    const defaultState = store.getState().login;

    store.dispatch(
      signInSuccess({
        user: {
          login: 'test_login',
          _id: 'test_id',
          password: 'test_password',
        },
        token: 'test_token',
      }),
    );
    store.dispatch(setCurrentSection({ section: SIGN_UP }));
    store.dispatch(logout());

    expect(store.getState().login).toEqual(defaultState);
  });

  test('Test setLoginError reducer case', () => {
    const testError = { active: true, message: 'Test message' };

    store.dispatch(setLoginError(testError));

    expect(store.getState().login.error).toEqual(testError);
  });
});
