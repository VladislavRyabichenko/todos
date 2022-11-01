import React from 'react';
import SignInForm from '../index';
import { renderWithProviders } from '../../../../testingUtils/testUtils';
import '@testing-library/jest-dom';
import { RootState, setupStore } from '../../../../store/store';
import { setLoginError } from '../../../../store/slices/loginSlice';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { STATUS_IDLE, STATUS_LOADING } from '../../../../constants/values';

describe('Testing SignInForm component', () => {
  test('Test components is rendered', () => {
    const { getByTestId, queryByTestId } = renderWithProviders(<SignInForm />);

    expect(getByTestId('test-sign-in-wrapper')).toBeInTheDocument();
    expect(getByTestId('test-sign-in-form')).toBeInTheDocument();
    expect(getByTestId('test-sign-in-field-login')).toBeInTheDocument();
    expect(getByTestId('test-sign-in-field-password')).toBeInTheDocument();
    expect(getByTestId('test-sign-in-button')).toBeInTheDocument();

    expect(queryByTestId('test-helper-text-sign-in')).not.toBeInTheDocument();
    expect(queryByTestId('test-loader-component')).not.toBeInTheDocument();
  });

  test('Test error rendering', () => {
    const store = setupStore();
    store.dispatch(setLoginError({ active: true, message: 'test-sign-in-error' }));

    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <SignInForm />
      </Provider>,
    );

    expect(getByTestId('test-helper-text-sign-in')).toBeInTheDocument();
    expect(getByText('test-sign-in-error')).toBeInTheDocument();
  });

  test('Test loader rendered', () => {
    const store = setupStore({
      login: {
        status: STATUS_LOADING,
        login: null,
        error: {
          active: false,
          message: '',
        },
      },
    } as RootState);

    const { getByTestId, queryByTestId } = render(
      <Provider store={store}>
        <SignInForm />
      </Provider>,
    );

    expect(queryByTestId('test-sign-in-button')).not.toBeInTheDocument();
    expect(getByTestId('test-loader-component')).toBeInTheDocument();
  });
});

// import React from 'react';
// import { fireEvent, render, screen } from '@testing-library/react';
// import { renderWithProviders } from '../../../../testingUtils/testUtils';
// import SignInForm from '../SignInForm';
// import '@testing-library/jest-dom';
// import { SIGN_IN, STATUS_IDLE } from '../../../../constants/values';
// import { setupStore } from '../../../../store/store';
// import { signInSuccess } from '../../../../store/slices/loginSlice';
// const { TextEncoder, TextDecoder } = require('util');
// global.TextEncoder = TextEncoder;
// global.TextDecoder = TextDecoder;
// import { useManageSignIn } from '../manageSignInHook/useManageSignIn';
// import { renderHook, act } from '@testing-library/react';
//
// import { Provider } from 'react-redux';
// import { FormEvent } from 'react';
// import button from '../../../Button/Button';
//
// test('', () => {});
//
// test('Container and sign-in button in document', async () => {
//   const { container } = renderWithProviders(<SignInForm />);
//   expect(screen.getByText(/sign in/i)).toBeInTheDocument();
//   expect(screen.getByTestId('sign-in-form')).toBeInTheDocument();
//   expect(container).toBeInTheDocument();
// });
//
// // const TestComponent = () => {
// //   const [loginValue] = useManageSignIn({
// //     initialLogin: '',
// //     initialPassword: '',
// //     useSelector: () => {},
// //     useDispatch: () => {},
// //   });
// //   return <></>;
// // };
//
// const Test = ({ handleSubmit }: any) => {
//   return (
//     <button onClick={handleSubmit}>SUBM</button>
//     // <form onSubmit={handleSubmit}>
//     //   <button type="submit">SUBM</button>
//     // </form>
//   );
// };
//
// const mockedReduxHooks_2 = {
//   mockDispatch_2: () => jest.fn(),
//   mockSelector_2: () => jest.fn(),
// };
//
// const mockedReduxHooks = {
//   mockDispatch: () => mockedReduxHooks_2.mockDispatch_2, ///jest.fn(() => {}),
//   mockSelector: () => mockedReduxHooks_2.mockSelector_2, //jest.fn(() => {}),
// };
//
// test('Sign-in button call dispatch', async () => {
//   const { container, getByTestId } = renderWithProviders(<SignInForm />);
//   // const signInBtn = getByTestId('sign-in-btn');
//
//   const mockedDispatchSpy = jest.spyOn(mockedReduxHooks, 'mockDispatch');
//   const mockedSelectorSpy = jest.spyOn(mockedReduxHooks, 'mockSelector');
//
//   const mockedDispatch_2_Spy = jest.spyOn(mockedReduxHooks_2, 'mockDispatch_2');
//
//   const { result } = renderHook(() =>
//     useManageSignIn({
//       initialLogin: 'login',
//       initialPassword: 'password',
//       useDispatch: mockedDispatchSpy,
//       useSelector: mockedSelectorSpy,
//     }),
//   );
//
//   const mockEvent = {
//     preventDefault: jest.fn(),
//   } as unknown as React.SyntheticEvent<HTMLFormElement>;
//
//   const methods = result.current;
//
//   // const spiedHandler = jest.spyOn(methods, 'handleSubmit').mockImplementation(() => Promise.resolve());
//
//   act(() => {
//     methods.handleSubmit(mockEvent);
//   });
//
//   expect(mockedDispatch_2_Spy).toHaveBeenCalled();
//
//   // const spiedHandler = jest.spyOn(methods, 'handleSubmit').mockImplementation(() => Promise.resolve());
//
//   // const { getByText } = render(<Test handleSubmit={spiedHandler} />);
//   // const btnSubmit = getByText('SUBM');
//   // fireEvent.click(btnSubmit);
//   // expect(spiedHandler).toBeCalledTimes(1);
//
//   // await handleSubmit(new React.);
//   // expect(mockedDispatchSpy).toBeCalledTimes(1);
// });
//
// test('Test [signInSuccess] reducer case', () => {
//   const store = setupStore();
//   const expectedStateAfterSignIn = {
//     isAuth: true,
//     id: 'test_id',
//     status: STATUS_IDLE,
//     currentSection: SIGN_IN,
//     login: 'test_login',
//
//     error: {
//       active: false,
//       message: '',
//     },
//   };
//
//   store.dispatch(
//     signInSuccess({
//       user: {
//         login: 'test_login',
//         _id: 'test_id',
//         password: 'test_password',
//       },
//       token: 'test_token',
//     }),
//   );
//
//   expect(store.getState().login).toEqual(expectedStateAfterSignIn);
//   console.log(store.getState());
// });
//
// export const setHookTestState = (newState: any) => {
//   const setStateMockFn = () => {};
//   return Object.keys(newState).reduce((acc, val) => {
//     acc = acc?.mockImplementationOnce(() => [newState[val], setStateMockFn]);
//     return acc;
//   }, jest.fn());
// };
