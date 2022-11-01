import React from 'react';
import InputForm from '../index';
import { renderWithProviders } from '../../../../testingUtils/testUtils';
import '@testing-library/jest-dom';
import { RootState, setupStore } from '../../../../store/store';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { STATUS_LOADING } from '../../../../constants/values';

describe('Testing InputForm component', () => {
  test('Test components is rendered', () => {
    const { getByTestId, queryByTestId } = renderWithProviders(<InputForm />);

    expect(getByTestId('test-input-form-container')).toBeInTheDocument();
    expect(getByTestId('test-input-form-text-field')).toBeInTheDocument();
    expect(getByTestId('test-input-form-button')).toBeInTheDocument();
    expect(getByTestId('test-input-form-button')).toBeDisabled();
    expect(queryByTestId('test-input-form-loader')).not.toBeInTheDocument();
  });

  test('Test button became enabled after input', () => {
    const store = setupStore();
    const { getByTestId, getByRole } = render(
      <Provider store={store}>
        <InputForm />
      </Provider>,
    );

    const todoInput = getByRole('todo-input');
    fireEvent.input(todoInput, { target: { value: 'test-todo-value' } });
    expect(getByTestId('test-input-form-button')).not.toBeDisabled();
  });

  test('Test loader render', () => {
    const store = setupStore({
      todos: {
        status: STATUS_LOADING,
        todoList: [],
      },
    } as RootState);

    const { getByTestId, queryByTestId } = render(
      <Provider store={store}>
        <InputForm />
      </Provider>,
    );

    expect(queryByTestId('test-input-form-button')).not.toBeInTheDocument();
    expect(getByTestId('test-input-form-loader')).toBeInTheDocument();
  });
});
