import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import styled from 'styled-components';
import { baseTheme } from '../styles/theme';
import Button from './Components/UI/Button';

import InputForm from './Components/TodoList/InputForm';
import TodoList from './Components/TodoList';
import Login from './Components/LoginForm';

import { logout, selectIsAuth, selectLogin, signIn } from './store/slices/loginSlice';
import Flex from './Components/UI/Flex';
import Container from './Components/UI/Container';

const AppWrapper = styled.div`
  //width: 100%;
  //min-height: 100vh;
  //padding: 2rem;
  //background: black;

  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: 300% 300%;
  background-image: linear-gradient(
    -45deg,
    rgba(59, 173, 227, 1) 0%,
    rgba(87, 111, 230, 1) 25%,
    rgba(152, 68, 183, 1) 51%,
    rgba(255, 53, 127, 1) 100%
  );
  animation: AnimateBG 20s ease infinite;

  @keyframes AnimateBG {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  color: #333;
`;

export default function App() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);
  const userLogin = useAppSelector(selectLogin);

  const handleLogout = () => dispatch(logout());
  // const io = new so

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

  return (
    <AppWrapper>
      {!isAuth && (
        <Container width="50%">
          <Login />
        </Container>
      )}
      {isAuth && (
        <Container width="50%" padding="20px">
          <Flex justify="flex-start" margin="0 0 10px 0">
            <Button text="Logout" onClick={handleLogout} width="100px" height="60px" />
          </Flex>
          <Flex direction="column">
            <InputForm />
            <TodoList />
          </Flex>
        </Container>
      )}
    </AppWrapper>
  );
}
