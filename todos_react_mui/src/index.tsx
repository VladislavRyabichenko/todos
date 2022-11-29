import React from 'react';
import { Provider } from 'react-redux';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import './App.scss';
import { setupStore } from './store/store';
import { createGlobalStyle } from 'styled-components';

const store = setupStore();

const Global = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Lato, sans-serif;
}`;

const rootElem = document.querySelector('#app');
const root = ReactDOM.createRoot(rootElem);
root.render(
  <Provider store={store}>
    <Global />
    <App />
  </Provider>,
);
