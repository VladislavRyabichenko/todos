import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { Button, Stack, Typography } from '@mui/material';

import InputForm from './Components/TodoList/InputForm';
import TodoList from './Components/TodoList';
import Login from './Components/LoginForm';

import { logout, selectIsAuth, selectLogin, signIn } from './store/slices/loginSlice';

export default function App() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);
  const userLogin = useAppSelector(selectLogin);

  const handleLogout = () => dispatch(logout());

  useEffect(() => {
    const localUserData: any = JSON.parse(window.localStorage.getItem('user-info'));
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
    return <Login />;
  }

  return (
    <Stack spacing={3} className="app">
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle1" fontWeight="bold">
          Hello, {userLogin}! Nice to see you again!
        </Typography>

        <Button type="button" variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      </Stack>
      <InputForm />
      <TodoList />
    </Stack>
  );
}
