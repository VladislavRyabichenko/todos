import React, { useContext, useState } from 'react';
import ButtonSubmit from '../Button.jsx';
import { LoginContext } from '../../Context/loginContext.jsx';

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
      active: active,
      message: message,
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
    <div className="signIn-form--container">
      {error.active && <div className="login-error">{error.message}</div>}

      <form className="signIn-form" onSubmit={handleSubmit}>
        <input type="text" value={loginValue} onChange={handleLoginInput} />
        <input type="password" value={passwordValue} onChange={handlePasswordInput} />

        <ButtonSubmit text={'Sign In'} />
      </form>
    </div>
  );
}
