import React from 'react';
import Todo from '../Todo';
import { renderWithProviders } from '../../../../testingUtils/testUtils';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import TodoList from '../../List';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

describe('Testing Todo component', () => {
  test('Test Todo uncompleted is rendered', () => {
    const { getByTestId, getByRole } = renderWithProviders(
      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="some_id">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <Todo text={'test-todo-texted'} completed={false} id={'test-id'} index={0} />
            </div>
          )}
        </Droppable>
      </DragDropContext>,
    );

    expect(getByTestId('test-todo-container')).toBeInTheDocument();
    expect(getByTestId('test-todo-input')).toBeInTheDocument();
    expect(getByTestId('test-todo-checkbox')).toBeInTheDocument();
    expect(getByTestId('test-todo-delete-button')).toBeInTheDocument();

    expect(getByTestId('test-todo-input')).not.toBeDisabled();

    expect(getByRole('todo-text-field').getAttribute('value')).toBe('test-todo-texted');

    // expect(getByTestId('test-todo-checkbox').querySelector('input[type="checkbox"]')).toHaveProperty('checked', false);
    expect(getByTestId('test-todo-checkbox')).toHaveProperty('checked', false);
  });

  test('Test completed TODO input is disabled', () => {
    const { getByTestId, getByRole } = renderWithProviders(
      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="some_id">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <Todo text={'test-todo-texted'} completed={true} id={'test-id'} index={0} />
            </div>
          )}
        </Droppable>
      </DragDropContext>,
    );
    expect(getByRole('todo-text-field')).toBeDisabled();
    expect(getByTestId('test-todo-checkbox')).toHaveProperty('checked', true);

    // expect(getByTestId('test-todo-checkbox').querySelector('input[type="checkbox"]')).toHaveProperty('checked', true);
  });
});
