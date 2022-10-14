import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, selectLoginError, selectStatus, setLoginError } from '../../store/slices/loginSlice';
import ButtonSubmit from '../Button/Button';
import Loader from '../Loader/Loader';

import { STATUS_LOADING } from '../../constants/values';

export default function RegistrationForm() {
  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const error = useSelector(selectLoginError);

  const dispatch = useDispatch();

  const status = useSelector(selectStatus);

  const handleError = (active, message) => {
    dispatch(setLoginError({ active: active, message: message }));
  };

  const handleLoginInput = (e) => {
    setLoginValue(e.target.value.trim());
  };

  const handlePasswordInput = (e) => {
    setPasswordValue(e.target.value.trim());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleError(false, '');
    if (!loginValue.length || !passwordValue.length) {
      handleError(true, 'Empty Values');
      return;
    }

    dispatch(registerUser({ login: loginValue, password: passwordValue }));
  };

  return (
    <div className="sign-in-form--container">
      {error.active && <div className="login-error">{error.message}</div>}

      <form className="sign-in-form" onSubmit={handleSubmit}>
        <input type="text" value={loginValue} onChange={handleLoginInput} />
        <input type="password" value={passwordValue} onChange={handlePasswordInput} />
        {status === STATUS_LOADING ? <Loader /> : <ButtonSubmit text={'Register'} />}
      </form>
    </div>
  );
}
