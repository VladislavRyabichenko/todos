import React, { useState } from 'react';
import  uniqId  from '../helpers/uniqueIdGenerator';

export const TodoContext = React.createContext();

export default function TodoContextProvider({ id, children }) {
  const [todoList, setTodoList] = useState(JSON.parse(window.localStorage.getItem('todos-'.concat(id))) || []);
  const saveToLocalStorage = (list) => {
    window.localStorage.setItem('todos-'.concat(id), JSON.stringify(list));
  };

  const addTodo = (todoText) => {
    const todo = {
      id: uniqId(),
      text: todoText,
      completed: false,
    };
    const newList = [...todoList, todo]
    setTodoList(newList);
    saveToLocalStorage(newList);
  };

  const removeTodo = (todoId) => {
    const newList = todoList.filter((todo) => todo.id !== todoId);
    setTodoList(newList);
    saveToLocalStorage(newList);
  };

  const updateTodo = (todoId, textEdited) => {
    const newList = todoList.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          text: textEdited,
        };
      }
      return todo;
    });
    setTodoList(newList);
    saveToLocalStorage(newList);
  };

  const toggleStatus = (todoId) => {
    const newList = todoList.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
    setTodoList(newList);
    saveToLocalStorage(newList);
  };

  return (
    <TodoContext.Provider
      value={{
        todoList: todoList,
        addTodo: addTodo,
        updateTodo: updateTodo,
        removeTodo: removeTodo,
        toggleStatus: toggleStatus,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
