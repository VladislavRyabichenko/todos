import React from 'react';
import App from './App.jsx';
import './App.scss';
import * as ReactDOM from 'react-dom/client';
import LoginContextProvider from './Context/loginContext.jsx';

const rootElem = document.querySelector('#app');
const root = ReactDOM.createRoot(rootElem);
root.render(
  <LoginContextProvider>
    <App />
  </LoginContextProvider>,
);
