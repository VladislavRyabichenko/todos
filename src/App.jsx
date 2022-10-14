import React, { useContext } from 'react';
import TodoContextProvider from './Context/TodoContext';
import InputForm from './Components/InputForm';
import List from './Components/List';
import { LoginContext } from './Context/loginContext';
import SignInForm from './Components/LoginForm/SignInForm';

export default function App() {
  const { isLogined, currentUser } = useContext(LoginContext);

  if (!isLogined) {
    return <SignInForm />;
  }
  return (
    <TodoContextProvider id={currentUser.id}>
      <div className="app">
        <InputForm />
        <List />
      </div>
    </TodoContextProvider>
  );
}
