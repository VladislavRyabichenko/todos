import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { selectId } from '../../../store/slices/loginSlice';
import { addTodo, selectTodoStatus } from '../../../store/slices/todosSlice';
import React, { useState } from 'react';
import { AppDispatch, RootState } from '../../../store/store';
import { TypedUseSelectorHook } from 'react-redux';

export const useManageInputForm = ({ useDispatch, useSelector }: any) => {
  const dispatch = useDispatch();
  const userId = useSelector(selectId);
  const status = useSelector(selectTodoStatus);

  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const todo = { text: inputValue, completed: false };

    dispatch(addTodo({ userId: userId, todo: todo }));
    setInputValue('');
  };

  const handleInput = (e: React.ChangeEvent<EventTarget>): void => {
    const target = e.target as HTMLInputElement;
    setInputValue(target.value);
  };

  return { userId, inputValue, handleInput, handleSubmit, status };
};
