import React, { useContext } from 'react';
import classNames from 'classnames';

import { TodoContext } from '../Context/TodoContext';

export default function Todo({ id, text, completed }) {
  const { updateTodo, toggleStatus, removeTodo } = useContext(TodoContext);

  const todoStatusClasses = classNames('todo--container', { 'completed': completed });

  const handleInputBlur = (e) => {
    const inputTrim = e.target.value.trim()
    if (inputTrim.length && inputTrim !== text) {
      updateTodo(id, inputTrim);
    }

  };
  const handleCheckbox = () => {
    toggleStatus(id);
  };
  const handleRemove = () => {
    removeTodo(id);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className={todoStatusClasses}>
      <div className="todo--text-container">
        <input
          className="todo--edit-input"
          type="text"
          defaultValue={text}
          disabled={completed}
          onBlur={handleInputBlur}
        />
      </div>
      <div className="todo--controls-container">
        <div>
          <input checked={completed} type="checkbox" onChange={handleCheckbox} />
        </div>
        <div className="delete-todo-button" onClick={handleRemove} aria-hidden="true">
          X
        </div>
      </div>
    </form>
  );
}
