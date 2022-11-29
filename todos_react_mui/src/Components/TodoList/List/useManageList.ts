import { useAppSelector } from '../../../hooks/hooks';
import { selectList } from '../../../store/slices/todosSlice';
import { TodoType } from '../../../types/commonTypes/commonTypes';
import { setListSuccess } from '../../../store/slices/todosSlice';
import { useEffect, useState } from 'react';
import { setList } from '../../../store/slices/todosSlice';
import { selectId } from '../../../store/slices/loginSlice';

const isSimilar = (actualTodos: TodoType[], localTodos: TodoType[]) => {
  return (
    localTodos.length === actualTodos.length &&
    actualTodos.every(
      (actualTodoItem) =>
        localTodos.findIndex((localTodoItem) => JSON.stringify(actualTodoItem) === JSON.stringify(localTodoItem)) !==
        -1,
    )
  );
};

export const useManageList = ({ useDispatch, useSelector }: any) => {
  const dispatch = useDispatch();
  const todoList = useSelector(selectList);
  const userId = useSelector(selectId);

  useEffect(() => {
    dispatch(setList(userId));
  }, []);

  const setOrderedList = (newList: Array<TodoType>): void => {
    window.localStorage.setItem('todos-local-ordered', JSON.stringify(newList));
    dispatch(setListSuccess(newList));
  };

  const setDisplayed = () => {
    const localTodos = window.localStorage.getItem('todos-local-ordered') || null;
    if (localTodos) {
      const localTodosParsed = JSON.parse(localTodos);
      const isSim = isSimilar(todoList, localTodosParsed);

      return isSim ? localTodosParsed : [...todoList];
    }
    return [...todoList];
  };

  useEffect(() => {
    dispatch(setListSuccess(setDisplayed()));
  }, []);

  return {
    list: [...todoList].sort((a: any, b: any) => +a.completed - +b.completed), //displayedList,
    setOrderedList: setOrderedList,
  };
};
