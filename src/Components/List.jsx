import React from 'react';
import { TodoContext } from '../Context/TodoContext.jsx';
import Todo from './Todo.jsx';

class List extends React.Component {
  static contextType = TodoContext;

  render() {
    const { todoList } = this.context;
    todoList.sort((a, b) => +a.completed - +b.completed);

    return (
      <div className="todo-list--container">
        {todoList.map((todo) => {
          return <Todo key={todo.id} data={todo} />;
        })}
      </div>
    );
  }
}

export default List;
