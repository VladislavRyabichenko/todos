import React from 'react';
import TodoList from '../../index';
import { renderWithProviders } from '../../../../testingUtils/testUtils';
import '@testing-library/jest-dom';

describe('Testing TodoList component', () => {
  test('Test TodoList is rendered', () => {
    const { getByTestId } = renderWithProviders(<TodoList />);

    expect(getByTestId('test-list-container')).toBeInTheDocument();
  });
});
