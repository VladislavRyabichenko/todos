import React, { useEffect } from 'react';
import { Stack } from '@mui/material';
import Todo from '../Todo';
import { useManageList } from './useManageList';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { DragDropContext, Droppable, OnDragEndResponder, DropResult } from 'react-beautiful-dnd';
import { reorder } from '../../../helpers/reorder';
import Flex from '../../UI/Flex';

export type DraggableListProps = {
  // items: Item[];
  onDragEnd: OnDragEndResponder;
};

const TodoList = (props: any) => {
  const { list, setOrderedList } = useManageList({ useDispatch: useAppDispatch, useSelector: useAppSelector });

  const onDragEnd = ({ destination, source }: DropResult) => {
    // dropped outside the list
    if (!destination) return;

    const newItems = reorder(list, source.index, destination.index);
    // console.log(newItems);

    setOrderedList(newItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} data-testid="test-list-container">
            <Flex direction="column" gap="10px" justify="center">
              {list.map((todo, index) => (
                <Todo key={todo.id} id={todo.id} text={todo.text} completed={todo.completed} index={index} />
              ))}
            </Flex>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;
