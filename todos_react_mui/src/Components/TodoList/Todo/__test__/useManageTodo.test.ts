import React from 'react';
import { SIGN_IN, STATUS_IDLE } from '../../../../constants/values';
import { renderHook, act } from '@testing-library/react';
import { useManageTodo } from '../useManageTodo';

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
    target: {
      value: 'test_value',
    },
  } as unknown as React.FocusEvent<HTMLInputElement>;

  beforeEach(() => {
    mockedReduxHooksReturnedValues = {
      mockDispatch: () => jest.fn(),
      mockSelector: jest.fn().mockReturnValueOnce('test_id'),
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
      useManageTodo({
        id: 'test_todo_id',
        completed: false,
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

  test('Testing initial values userId', () => {
    expect(methods.userId).toBe('test_id');
  });

  test('Testing handleInputBlur', () => {
    act(() => {
      methods.handleInputBlur(mockEvent);
    });
    expect(spiedMockedDispatch).toHaveBeenCalled();
  });

  test('Testing handleCheckbox', () => {
    act(() => {
      methods.handleCheckbox();
    });
    expect(spiedMockedDispatch).toHaveBeenCalled();
  });

  test('Testing handleDelete', () => {
    act(() => {
      methods.handleDelete();
    });
    expect(spiedMockedDispatch).toHaveBeenCalled();
  });
});
