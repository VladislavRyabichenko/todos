import React, { Component } from 'react';
import { uniqId } from '../helpers/uniqueIdGenerator';

export const TodoContext = React.createContext();

export default class TodoContextProvider extends Component {
  constructor(props) {
    super(props);
    this.id = this.props.id;
    this.state = { todoList: JSON.parse(window.localStorage.getItem('todos-'.concat(this.id))) || [] };
    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.toggleStatus = this.toggleStatus.bind(this);
  }

  componentDidUpdate() {
    this.saveToLocalStorage(this.state.todoList);
  }

  addTodo(todoText) {
    const todo = {
      id: uniqId(),
      text: todoText,
      completed: false,
    };
    this.setState({ todoList: [...this.state.todoList, todo] });
  }

  removeTodo(id) {
    const newList = this.state.todoList.filter((todo) => todo.id !== id);
    this.setState({ todoList: [...newList] });
  }

  updateTodo(id, textEdited) {
    const newList = this.state.todoList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text: textEdited,
        };
      }
      return todo;
    });
    this.setState({ todoList: newList });
  }

  toggleStatus(id) {
    const newList = this.state.todoList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
    this.setState({ todoList: newList });
  }

  saveToLocalStorage(list) {
    window.localStorage.setItem('todos-'.concat(this.id), JSON.stringify(list));
  }

  render() {
    return (
      <TodoContext.Provider
        value={{
          ...this.state,
          addTodo: this.addTodo,
          updateTodo: this.updateTodo,
          removeTodo: this.removeTodo,
          toggleStatus: this.toggleStatus,
        }}
      >
        {this.props.children}
      </TodoContext.Provider>
    );
  }
}
