import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import todosSaga from './todosSaga';

export default function* rootWatcher() {
  yield all([loginSaga(), todosSaga()]);
}
