import React, { useContext, useState } from 'react';
import ButtonSubmit from '../Button';
import { LoginContext } from '../../Context/loginContext';

export default function SignInForm() {
  const { signInRequest } = useContext(LoginContext);
  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [error, setError] = useState({
    active: false,
    message: '',
  });

  const handleError = (active, message) => {
    setError({
      active,
      message,
    });
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

    await signInRequest(loginValue, passwordValue).catch(() => handleError(true, 'Invalid data'));
  };


  return (
    <div className="sign-in-form--container">
      {error.active && <div className="login-error">{error.message}</div>}

      <form className="sign-in-form" onSubmit={handleSubmit}>
        <input type="text" value={loginValue} onChange={handleLoginInput} />
        <input type="password" value={passwordValue} onChange={handlePasswordInput} />
        <ButtonSubmit text={'Sign In'} />
      </form>
    </div>
  );
}
