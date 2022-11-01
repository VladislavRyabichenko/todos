import React from 'react';
import RegistrationForm from '../index';
import { renderWithProviders } from '../../../../testingUtils/testUtils';
import '@testing-library/jest-dom';
import { RootState, setupStore } from '../../../../store/store';
import { setLoginError } from '../../../../store/slices/loginSlice';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { STATUS_IDLE, STATUS_LOADING } from '../../../../constants/values';

describe('Testing RegistrationForm component', () => {
  test('Test components is rendered', () => {
    const { getByTestId, queryByTestId } = renderWithProviders(<RegistrationForm />);

    expect(getByTestId('test-registration-wrapper')).toBeInTheDocument();
    expect(getByTestId('test-registration-form')).toBeInTheDocument();
    expect(getByTestId('test-registration-field-login')).toBeInTheDocument();
    expect(getByTestId('test-registration-field-password')).toBeInTheDocument();
    expect(getByTestId('test-registration-button')).toBeInTheDocument();

    expect(queryByTestId('test-helper-text-registration')).not.toBeInTheDocument();
    expect(queryByTestId('test-loader-component')).not.toBeInTheDocument();
  });

  test('Test error rendering', () => {
    const store = setupStore();
    store.dispatch(setLoginError({ active: true, message: 'test-registration-error' }));

    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <RegistrationForm />
      </Provider>,
    );

    expect(getByTestId('test-helper-text-registration')).toBeInTheDocument();
    expect(getByText('test-registration-error')).toBeInTheDocument();
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
        <RegistrationForm />
      </Provider>,
    );

    expect(queryByTestId('test-registration-button')).not.toBeInTheDocument();
    expect(getByTestId('test-loader-component')).toBeInTheDocument();
  });
});
