import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import loginReducer from './slices/loginSlice';
import todosReducer from './slices/todosSlice';
import  rootWatcher  from '../saga';


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    login: loginReducer,
    todos: todosReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootWatcher);

export default store
