import React, { useContext } from 'react';
import { TodoContext } from '../Context/TodoContext.jsx';
import classNames from 'classnames';

export default function Todo({ id, text, completed }) {
  const { updateTodo, toggleStatus, removeTodo } = useContext(TodoContext);

  const todoStatusClasses = classNames('todo--container', { ['completed']: completed });

  const handleInputBlur = (e) => {
    updateTodo(id, e.target.value);
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
        <div className="delete-todo-button" onClick={handleRemove}>
          X
        </div>
      </div>
    </form>
  );
}
