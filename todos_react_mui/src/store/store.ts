import {
  combineReducers,
  configureStore,
  PreloadedState,
  applyMiddleware,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import loginReducer from './slices/loginSlice';
import todosReducer from './slices/todosSlice';
import rootWatcher from '../saga';

const sagaMiddleware = createSagaMiddleware();
// sagaMiddleware.run(rootWatcher);
// Create the root reducer independently to obtain the RootState type
const rootReducer = combineReducers({
  login: loginReducer,
  todos: todosReducer,
});
// const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
    preloadedState,
  });
  sagaMiddleware.run(rootWatcher);
  return store;
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

// import { configureStore } from '@reduxjs/toolkit';
// import createSagaMiddleware from 'redux-saga';
// import loginReducer from './slices/loginSlice';
// import todosReducer from './slices/todosSlice';
// import rootWatcher from '../saga';
//
// const sagaMiddleware = createSagaMiddleware();
//
// export const store = configureStore({
//   reducer: {
//     login: loginReducer,
//     todos: todosReducer,
//   },
//   middleware: [sagaMiddleware],
// });
//
// sagaMiddleware.run(rootWatcher);
//
// export default store;
//
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// export type AppStore = ReturnType<typeof configureStore>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
