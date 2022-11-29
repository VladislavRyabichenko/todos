import React from 'react';
import LoginForm from '../../index';
import { renderWithProviders } from '../../../../testingUtils/testUtils';
import '@testing-library/jest-dom';
import { setupStore } from '../../../../store/store';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';

describe('Testing Login component', () => {
  test('Test components is rendered', () => {
    const { getByTestId } = renderWithProviders(<LoginForm />);

    expect(getByTestId('test-login-wrapper')).toBeInTheDocument();
    expect(getByTestId('test-tabs-wrapper')).toBeInTheDocument();
    expect(getByTestId('test-tabs-container')).toBeInTheDocument();
    expect(getByTestId('tab-to-sign-in')).toBeInTheDocument();
    expect(getByTestId('tab-to-sign-up')).toBeInTheDocument();
    expect(getByTestId('test-tabs-sign-in-panel')).toBeInTheDocument();
    expect(getByTestId('test-tabs-sign-up-panel')).toBeInTheDocument();
  });

  test('Test different sections rendered', () => {
    const store = setupStore();
    const { getByTestId } = render(
      <Provider store={store}>
        <LoginForm />
      </Provider>,
    );

    const navigationToSignUp = getByTestId('tab-to-sign-up');
    fireEvent.click(navigationToSignUp);

    expect(getByTestId('test-sign-up-component-in-panel')).toBeInTheDocument();

    const navigationToSignIn = getByTestId('tab-to-sign-in');
    fireEvent.click(navigationToSignIn);

    expect(getByTestId('test-sign-in-component-in-panel')).toBeInTheDocument();
  });
});

// import { selectLoginSection, setCurrentSection } from '../../../../store/slices/loginSlice';
// import { SIGN_IN, SIGN_UP, STATUS_IDLE } from '../../../../constants/values';
// import { store } from '../../../../store/store';
// import { getByTestId, render } from '@testing-library/react';
//
// import { fireEvent } from '@testing-library/react';
// import Login from '../Login';
// import * as renderer from 'react-test-renderer';
// import { screen } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { LoginStateType } from '../../../../types/reduxTypes/loginSlice/loginSliceTypes';
//
// const initialState: LoginStateType = {
//   isAuth: false,
//   id: null,
//   status: STATUS_IDLE,
//   currentSection: SIGN_IN,
//   login: null,
//
//   error: {
//     active: false,
//     message: '',
//   },
// };
//
// describe('Testing current section selector', () => {
//   test('work with initial state', () => {
//     const { getByTestId, getByText, container } = render(
//       <Provider store={store}>
//         <Login />
//       </Provider>,
//     );
//
//     expect(container).toBeInTheDocument();
//
//     // selectLoginSection(initialState)
//     // expect(selectLoginSection(store.getState())).toBe(SIGN_IN);
//   });
//
//   test('test setting current login section', () => {
//     store.dispatch(setCurrentSection({ section: SIGN_UP }));
//     expect(selectLoginSection(store.getState())).toBe(SIGN_UP);
//
//     store.dispatch(setCurrentSection({ section: SIGN_IN }));
//     expect(selectLoginSection(store.getState())).toBe(SIGN_IN);
//
//     store.dispatch(setCurrentSection({ section: SIGN_UP }));
//     expect(selectLoginSection(store.getState())).toBe(SIGN_UP);
//   });
//
//   test('render form due to section value SIGN_IN', () => {
//     store.dispatch(setCurrentSection({ section: SIGN_IN }));
//     // store.dispatch(setCurrentSection({ section: SIGN_UP }));
//     const { getByTestId } = render(
//       <Provider store={store}>
//         <Login />
//       </Provider>,
//     );
//     const signInForm = getByTestId('sign-in-form');
//     expect(signInForm).toBeTruthy();
//
//     // const treeWithSignIn = renderer
//     //   .create(
//     //     <Provider store={store}>
//     //       <Login />
//     //     </Provider>,
//     //   )
//     //   .toJSON();
//     // console.log(store.getState());
//     // console.log(treeWithSignIn);
//     // expect(treeWithSignIn).toMatchSnapshot();
//   });
//
//   test('render form due to section value SIGN_UP', () => {
//     store.dispatch(setCurrentSection({ section: SIGN_UP }));
//     // store.dispatch(setCurrentSection({ section: SIGN_UP }));
//     const { getByTestId } = render(
//       <Provider store={store}>
//         <Login />
//       </Provider>,
//     );
//     const signUpForm = getByTestId('sign-up-form');
//     expect(signUpForm).toBeTruthy();
//
//     // const signUpForm = getByTestId("sig")
//
//     // const treeWithSignUp = renderer
//     //   .create(
//     //     <Provider store={store}>
//     //       <Login />
//     //     </Provider>,
//     //   )
//     //   .toJSON();
//     // console.log(store.getState());
//     // console.log(treeWithSignUp);
//     //
//     // expect(treeWithSignUp).toMatchSnapshot();
//   });
//
//   test('toggle tabs', () => {
//     const { getByTestId } = render(
//       <Provider store={store}>
//         <Login />
//       </Provider>,
//     );
//
//     const signInTab = getByTestId('tab-to-sign-in');
//     const signUpTab = getByTestId('tab-to-sign-up');
//
//     fireEvent.click(signUpTab);
//     expect(selectLoginSection(store.getState())).toBe(SIGN_UP);
//
//     fireEvent.click(signInTab);
//     expect(selectLoginSection(store.getState())).toBe(SIGN_IN);
//   });
// });
