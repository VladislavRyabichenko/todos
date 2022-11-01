import React from 'react';
import { selectId } from '../../../store/slices/loginSlice';
import { removeTodo, updateTodoStatus, updateTodoText } from '../../../store/slices/todosSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';

type TodoPropsType = {
  id: string;
  completed: boolean;
  useDispatch: any;
  useSelector: any;
};

export const useManageTodo = ({ id, completed, useDispatch, useSelector }: TodoPropsType) => {
  const dispatch = useDispatch();
  const userId = useSelector(selectId);

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    dispatch(updateTodoText({ userId: userId, todoId: id, text: e.target.value }));
  };
  const handleCheckbox = () => {
    dispatch(updateTodoStatus({ userId: userId, todoId: id, value: !completed }));
  };
  const handleDelete = () => {
    dispatch(removeTodo({ userId: userId, todoId: id }));
  };

  return { handleInputBlur, handleCheckbox, handleDelete, userId };
};
