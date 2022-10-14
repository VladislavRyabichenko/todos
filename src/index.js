import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import './App.scss';

import LoginContextProvider from './Context/loginContext';

const rootElem = document.querySelector('#app');
const root = ReactDOM.createRoot(rootElem);
root.render(
  <LoginContextProvider>
    <App />
  </LoginContextProvider>,
);
