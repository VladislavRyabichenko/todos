import React, { useState } from 'react';
import { selectLoginError, selectStatus, setLoginError, signIn } from '../../../../store/slices/loginSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
// import { useDispatch, useSelector } from 'react-redux';

type PropsType = {
  initialLogin: string;
  initialPassword: string;
  useDispatch: any;
  useSelector: any;
};

export const useManageSignIn = ({ initialLogin, initialPassword, useDispatch, useSelector }: PropsType) => {
  const dispatch = useDispatch();

  const status = useSelector(selectStatus);
  const error = useSelector(selectLoginError);

  const [loginValue, setLoginValue] = useState<string>(initialLogin);
  const [passwordValue, setPasswordValue] = useState<string>(initialPassword);

  const handleError = (active: boolean, message: string): void => {
    dispatch(setLoginError({ active: active, message: message }));
  };

  const handleLoginInput = (e: React.ChangeEvent<EventTarget>): void => {
    let target = e.target as HTMLInputElement;
    setLoginValue(target.value.trim());
  };

  const handlePasswordInput = (e: React.ChangeEvent<EventTarget>): void => {
    let target = e.target as HTMLInputElement;
    setPasswordValue(target.value.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleError(false, '');

    if (!loginValue.length || !passwordValue.length) {
      handleError(true, 'Empty Values');
      return;
    }

    dispatch(signIn({ login: loginValue, password: passwordValue }));
  };

  return {
    loginValue,
    handleLoginInput,
    passwordValue,
    handlePasswordInput,
    handleSubmit,
    status,
    error,
    handleError,
    setLoginValue,
  }; // as const;
};
