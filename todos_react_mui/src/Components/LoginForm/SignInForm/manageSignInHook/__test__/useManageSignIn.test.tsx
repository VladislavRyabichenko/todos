import React from 'react';
import { useManageSignIn } from '../useManageSignIn';
import { renderHook, act } from '@testing-library/react';
import { STATUS_IDLE } from '../../../../../constants/values';

describe('Test useManageSignIn hook', () => {
  const mockFormEvent = {
    preventDefault: jest.fn(),
  } as unknown as React.SyntheticEvent<HTMLFormElement>;

  let mockedDispatchSpy: any;
  let mockedSelectorSpy: any;
  let spiedMockedDispatch: any;
  let spiedMockedSelector: any;

  let methods: any;
  let mockedReduxHooks: any;

  let mockedReduxHooksReturnedValues: any;

  beforeEach(() => {
    mockedReduxHooksReturnedValues = {
      mockDispatch: () => jest.fn(),
      mockSelector: jest.fn().mockReturnValueOnce(STATUS_IDLE).mockReturnValueOnce({ active: false, message: '' }),
    };

    mockedReduxHooks = {
      mockUseDispatch: () => mockedReduxHooksReturnedValues.mockDispatch, ///jest.fn(() => {}),
      mockUseSelector: mockedReduxHooksReturnedValues.mockSelector, //jest.fn().mockReturnValueOnce(STATUS_IDLE).mockReturnValueOnce({ active: false, message: '' }), //jest.fn(() => {}),
    };

    mockedDispatchSpy = jest.spyOn(mockedReduxHooks, 'mockUseDispatch');
    mockedSelectorSpy = jest.spyOn(mockedReduxHooks, 'mockUseSelector');

    spiedMockedDispatch = jest.spyOn(mockedReduxHooksReturnedValues, 'mockDispatch');
    spiedMockedSelector = jest.spyOn(mockedReduxHooksReturnedValues, 'mockSelector');

    const { result } = renderHook(() =>
      useManageSignIn({
        initialLogin: 'login',
        initialPassword: 'password',
        useDispatch: mockedDispatchSpy,
        useSelector: mockedSelectorSpy,
      }),
    );

    methods = result.current;
  });

  test('Test initial login/password/status values', () => {
    expect(methods.loginValue).toBe('login');
    expect(methods.passwordValue).toBe('password');
    expect(methods.status).toBe(STATUS_IDLE);
  });

  test('Test handle submit method', () => {
    act(() => {
      methods.handleSubmit(mockFormEvent);
    });

    expect(spiedMockedDispatch).toHaveBeenCalled();
  });

  test('Test handle error method', () => {
    act(() => {
      methods.handleError(false, '');
    });

    expect(spiedMockedDispatch).toHaveBeenCalled();
  });
});
