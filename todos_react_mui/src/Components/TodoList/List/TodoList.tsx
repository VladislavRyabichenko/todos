import React from 'react';
import { Stack } from '@mui/material';
import Todo from '../Todo';
import { useManageList } from './useManageList';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { DragDropContext, Droppable, OnDragEndResponder, DropResult } from 'react-beautiful-dnd';
import { reorder } from '../../../helpers/reorder';

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
          <Stack
            ref={provided.innerRef}
            {...provided.droppableProps}
            spacing={3}
            mt="20px"
            data-testid="test-list-container"
          >
            {list.map((todo, index) => (
              <Todo key={todo.id} id={todo.id} text={todo.text} completed={todo.completed} index={index} />
            ))}
            {provided.placeholder}
          </Stack>
          // <div ref={provided.innerRef} {...provided.droppableProps}>
          //   {list.map((todo, index) => (
          //     <Todo key={todo.id} id={todo.id} text={todo.text} completed={todo.completed} index={index} />
          //   ))}
          //   {provided.placeholder}
          // </div>
        )}
        {/*<Stack spacing={3} mt="20px" data-testid="test-list-container">*/}
        {/*  {list.map((todo) => (*/}
        {/*    <Todo key={todo.id} id={todo.id} text={todo.text} completed={todo.completed} />*/}
        {/*  ))}*/}
        {/*</Stack>*/}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;
