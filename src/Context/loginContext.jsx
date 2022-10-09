import React, { useState } from 'react';
import loginRequest from '../DATA_BASE/DB';

export const LoginContext = React.createContext({});

export default function LoginContextProvider({ children }) {
  const [isLogined, setIsLogined] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    login: null,
    id: null,
  });

  const signInRequest = async (login, password) => {
    const res = await loginRequest(login, password).catch(() => {
      throw new Error('failed req');
    });
    setIsLogined(true);
    setCurrentUser({
      login: res.login,
      id: res.id,
    });
  };

  return (
    <LoginContext.Provider
      value={{ isLogined: isLogined, currentUser: currentUser, signInRequest: signInRequest.bind(this) }}
    >
      {children}
    </LoginContext.Provider>
  );
}
