import React from 'react';
import { SIGN_IN } from '../../../../constants/values';
import { renderHook, act } from '@testing-library/react';
import { useManageLogin } from '../useManageLogin';

describe('Testing useManageLogin hook', () => {
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
      mockSelector: jest.fn().mockReturnValue(SIGN_IN),
    };

    const mockEvent = {
      preventDefault: jest.fn(),
    } as unknown as React.SyntheticEvent<HTMLFormElement>;
    mockedReduxHooks = {
      mockUseDispatch: () => mockedReduxHooksReturnedValues.mockDispatch, ///jest.fn(() => {}),
      mockUseSelector: mockedReduxHooksReturnedValues.mockSelector, //jest.fn().mockReturnValueOnce(STATUS_IDLE).mockReturnValueOnce({ active: false, message: '' }), //jest.fn(() => {}),
    };

    mockedDispatchSpy = jest.spyOn(mockedReduxHooks, 'mockUseDispatch');
    mockedSelectorSpy = jest.spyOn(mockedReduxHooks, 'mockUseSelector');

    spiedMockedDispatch = jest.spyOn(mockedReduxHooksReturnedValues, 'mockDispatch');
    spiedMockedSelector = jest.spyOn(mockedReduxHooksReturnedValues, 'mockSelector');

    const { result } = renderHook(() =>
      useManageLogin({
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

  test('Testing useManageLogin initial section value', () => {
    expect(methods.currentSection).toBe(SIGN_IN);
  });

  test('Testing change section handler', () => {
    act(() => {
      methods.handleNavigation();
    });
    expect(spiedMockedDispatch).toHaveBeenCalled();
  });
});
