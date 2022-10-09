import React, { useEffect, useState } from 'react';
import { uniqId } from '../helpers/uniqueIdGenerator';

export const TodoContext = React.createContext();

export default function TodoContextProvider({ id, children }) {
  const [todoList, setTodoList] = useState(JSON.parse(window.localStorage.getItem('todos-'.concat(id))) || []);

  useEffect(() => {
    saveToLocalStorage(todoList);
  }, [todoList]);

  const addTodo = (todoText) => {
    const todo = {
      id: uniqId(),
      text: todoText,
      completed: false,
    };
    setTodoList([...todoList, todo]);
  };

  const removeTodo = (id) => {
    const newList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newList);
  };

  const updateTodo = (id, textEdited) => {
    const newList = todoList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text: textEdited,
        };
      }
      return todo;
    });
    setTodoList(newList);
  };

  const toggleStatus = (id) => {
    const newList = todoList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
    setTodoList(newList);
  };

  const saveToLocalStorage = (list) => {
    window.localStorage.setItem('todos-'.concat(id), JSON.stringify(list));
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
