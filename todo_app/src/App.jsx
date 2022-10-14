import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputForm from './Components/TodoList/InputForm';
import List from './Components/TodoList/List';
import  Login  from './Components/LoginForm/Login';

import { logout, selectIsAuth, signIn } from './store/slices/loginSlice';


export default function App() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(logout());

  useEffect(() => {
    const localUserData = JSON.parse(window.localStorage.getItem('user-info'));
    if (localUserData) {
      const { login, password } = localUserData;
      dispatch(
        signIn({
          login: login,
          password: password,
        }),
      );
    }
  }, []);

  if (!isAuth) {
    return (
      <div>
        <Login />
      </div>
    );
  }

  return (
    <div className="app">
      <div className="logout--container">
        <button type="button" className="login--nav-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <InputForm />
      <List />
    </div>
  );
}
