import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
// import todosSaga from './todosSaga';
import { flow } from './todosSaga';

export default function* rootWatcher() {
  yield all([loginSaga(), flow()]);
}
