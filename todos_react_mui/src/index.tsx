import React from 'react';
import { Provider } from 'react-redux';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import './App.scss';
import { setupStore } from './store/store';

const store = setupStore();

const rootElem = document.querySelector('#app');
const root = ReactDOM.createRoot(rootElem);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
