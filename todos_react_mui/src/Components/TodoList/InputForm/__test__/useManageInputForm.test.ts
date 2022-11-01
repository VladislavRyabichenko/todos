import React from 'react';
import { SIGN_IN, STATUS_IDLE } from '../../../../constants/values';
import { renderHook, act } from '@testing-library/react';
import { useManageInputForm } from '../useManageInputForm';

describe('Testing useManageInputForm hook', () => {
  let mockedDispatchSpy: any;
  let mockedSelectorSpy: any;
  let spiedMockedDispatch: any;
  let spiedMockedSelector: any;

  let methods: any;
  let mockedReduxHooks: any;

  let mockedReduxHooksReturnedValues: any;

  const mockEvent = {
    preventDefault: jest.fn(),
  } as unknown as React.SyntheticEvent<HTMLFormElement>;

  beforeEach(() => {
    mockedReduxHooksReturnedValues = {
      mockDispatch: () => jest.fn(),
      mockSelector: jest.fn().mockReturnValueOnce('test_id').mockReturnValueOnce(STATUS_IDLE),
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
      useManageInputForm({
        useDispatch: mockedDispatchSpy,
        useSelector: mockedSelectorSpy,
      }),
    );

    methods = result.current;
  });

  test('Testing useDispatch called', () => {
    expect(mockedDispatchSpy).toBeCalled();
  });

  test('Testing useSelector called', () => {
    expect(mockedSelectorSpy).toBeCalled();
  });

  test('Testing initial values userId/status/inputValue', () => {
    expect(methods.inputValue).toBe('');
    expect(methods.userId).toBe('test_id');
    expect(methods.status).toBe(STATUS_IDLE);
  });

  test('Testing initial values userId/status/inputValue', () => {
    expect(methods.inputValue).toBe('');
    expect(methods.userId).toBe('test_id');
    expect(methods.status).toBe(STATUS_IDLE);
  });

  test('Testing change submit handler', () => {
    act(() => {
      methods.handleSubmit(mockEvent);
    });
    expect(spiedMockedDispatch).toHaveBeenCalled();
  });
});
