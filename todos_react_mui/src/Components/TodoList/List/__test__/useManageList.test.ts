import React from 'react';
import { SIGN_IN, STATUS_IDLE } from '../../../../constants/values';
import { renderHook, act } from '@testing-library/react';
import { useManageList } from '../useManageList';

describe('Testing useManageList hook', () => {
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

  const testTodoList = [{ id: 'test_1', text: 'test_text', completed: false }];

  beforeEach(() => {
    mockedReduxHooksReturnedValues = {
      mockDispatch: () => jest.fn(),
      mockSelector: jest.fn().mockReturnValue(testTodoList),
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
      useManageList({
        useDispatch: mockedDispatchSpy,
        useSelector: mockedSelectorSpy,
      }),
    );

    methods = result.current;
  });

  test('Testing useSelector called', () => {
    expect(mockedSelectorSpy).toBeCalled();
  });

  test('Testing initial values userId/status/inputValue', () => {
    expect(methods.list).toEqual(testTodoList);
  });
});
