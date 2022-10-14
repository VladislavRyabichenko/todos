import React from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { selectId } from '../../store/slices/loginSlice';
import { removeTodo, updateTodoStatus, updateTodoText } from '../../store/slices/todosSlice';

export default function Todo({ id, text, completed }) {
  const dispatch = useDispatch();
  const userId = useSelector(selectId);

  const todoStatusClasses = classNames('todo--container', { completed: completed });

  const handleInputBlur = (e) => {
    const inputTrim = e.target.value.trim();
    if (inputTrim.length && inputTrim !== text) {
      dispatch(updateTodoText({ userId: userId, todoId: id, text: e.target.value }));
    }
  };
  const handleCheckbox = () => {
    dispatch(updateTodoStatus({ userId: userId, todoId: id, value: !completed }));
  };
  const handleDelete = () => {
    dispatch(removeTodo({ userId: userId, todoId: id }));
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
        <div className="delete-todo-button" onClick={handleDelete} aria-hidden="true">
          X
        </div>
      </div>
    </form>
  );
}
