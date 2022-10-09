import React from 'react';
import { TodoContext } from '../Context/TodoContext.jsx';
import classNames from 'classnames';

class Todo extends React.Component {
  static contextType = TodoContext;

  constructor(props) {
    super(props);
  }

  render() {
    const { updateTodo, toggleStatus, removeTodo } = this.context;
    const id = this.props.data['id'];
    const text = this.props.data['text'];
    const completed = this.props.data['completed'];
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
      <form className={todoStatusClasses}>
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
}

export default Todo;
