import React, { useContext } from 'react';
import { TodoContext } from '../Context/TodoContext.jsx';
import Todo from './Todo.jsx';

export default function List() {
  const { todoList } = useContext(TodoContext);
  todoList.sort((a, b) => +a.completed - +b.completed);

  return (
    <div className="todo-list--container">
      {todoList.map((todo) => {
        return <Todo key={todo.id} id={todo.id} text={todo.text} completed={todo.completed} />;
      })}
    </div>
  );
}
