import React, { useContext } from 'react';
import TodoContextProvider from './Context/TodoContext.jsx';
import InputForm from './Components/InputForm.jsx';
import List from './Components/List.jsx';
import { LoginContext } from './Context/loginContext.jsx';
import SignInForm from './Components/LoginForm/SignInForm.jsx';

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
