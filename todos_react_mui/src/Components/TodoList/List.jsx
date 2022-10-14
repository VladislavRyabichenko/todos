import React from 'react';
import { useSelector } from 'react-redux';
import { selectList } from '../../store/slices/todosSlice';
import Todo from './Todo';



export default function List() {
  const todoList = useSelector(selectList);

  const displayedList = [...todoList].sort((a, b) => +a.completed - +b.completed);

  return (
    <div className="todo-list--container">
      {displayedList.map((todo) =>
        <Todo key={todo.id} id={todo.id} text={todo.text} completed={todo.completed} />
      )}
    </div>
  );
}
