import { takeEvery, call } from 'redux-saga/effects';
import { runSaga } from 'redux-saga';
import loginSaga, { workerSignInUser } from '../loginSaga';
// import { signInUser } from '../../services/services';
import * as services from '../../services/services';
import { PayloadAction } from '@reduxjs/toolkit';
import { signInActionType, signInSuccessActionType } from '../../types/reduxTypes/loginSlice/loginSliceTypes';
import { SignInUserDataType, UserData } from '../../types/servicesTypes/servicesTypes';
import { TodoType } from '../../types/commonTypes/commonTypes';
import { signIn, signInSuccess } from '../../store/slices/loginSlice';

import { loginSlice } from '../../store/slices/loginSlice';
import { setupStore } from '../../store/store';
import { STATUS_IDLE, STATUS_LOADING } from '../../constants/values';

describe('Test worker signIn', () => {
  jest.mock('redux-saga', () => () => ({ run: jest.fn() }));
  test('test s', () => {
    const store = setupStore();
    store.dispatch(signIn({ login: 'login', password: 'password' }));
    expect(store.getState().login.status).toBe(STATUS_LOADING);
  });
  const genObject = loginSaga(); //workerSignInUser({ payload: { login: 'a', password: 'a' } } as PayloadAction<signInActionType>);
  const dummyAuthors = {
    data: {
      user: {
        _id: 'test_id',
        login: 'test_login',
        password: 'test_password',
        todos: [{ id: 'test_todo_id', text: 'test_todo_text', completed: true }],
      },
      token: 'test_token',
    },
  } as any;

  const data = {
    type: 'testType',
    payload: { login: 'a', password: 'a' },
  } as PayloadAction<signInActionType>;

  const requestAuthors = jest
    .spyOn(services, 'signInUser')
    .mockImplementation(async () => await Promise.resolve(dummyAuthors));

  // test('test', async () => {
  //   expect(genObject.next().value).toEqual(takeEvery('login/signIn', workerSignInUser));
  //
  //   const dispatched: any = [];
  //   const result = await runSaga(
  //     {
  //       dispatch: (action) => dispatched.push(action),
  //     },
  //     workerSignInUser,
  //     {
  //       type: 'testType',
  //       payload: { login: 'a', password: 'a' },
  //     } as PayloadAction<signInActionType>,
  //   );
  //   // expect(requestAuthors).toHaveBeenCalledTimes(1);
  // });
});
