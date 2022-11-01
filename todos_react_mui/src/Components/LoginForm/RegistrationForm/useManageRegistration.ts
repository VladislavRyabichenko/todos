import React, { useState } from 'react';

import { registerUser, selectLoginError, selectStatus, setLoginError, signIn } from '../../../store/slices/loginSlice';

type PropsType = {
  initialLogin: string;
  initialPassword: string;
  useDispatch: any;
  useSelector: any;
};

export const useManageRegistration = ({ initialLogin, initialPassword, useDispatch, useSelector }: PropsType) => {
  const dispatch = useDispatch();

  const status = useSelector(selectStatus);
  const error = useSelector(selectLoginError);

  const [loginValue, setLoginValue] = useState<string>(initialLogin);
  const [passwordValue, setPasswordValue] = useState<string>(initialPassword);

  const handleError = (active: boolean, message: string): void => {
    dispatch(setLoginError({ active: active, message: message }));
  };

  const handleLoginInput = (e: React.ChangeEvent<EventTarget>): void => {
    const target = e.target as HTMLInputElement;
    setLoginValue(target.value.trim());
  };

  const handlePasswordInput = (e: React.ChangeEvent<EventTarget>): void => {
    const target = e.target as HTMLInputElement;
    setPasswordValue(target.value.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleError(false, '');
    if (!loginValue.length || !passwordValue.length) {
      handleError(true, 'Empty Values');
      return;
    }

    dispatch(registerUser({ login: loginValue, password: passwordValue }));
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
  };
};
