import { call, put, takeEvery } from 'redux-saga/effects';
import { regUser, signInUser } from '../services/services';
import { registerUserSuccess, setLoginError, signInSuccess } from '../store/slices/loginSlice';
import { setListSuccess } from '../store/slices/todosSlice';

function* workerSignInUser(action) {
  try {
    const res = yield call(() => signInUser(action.payload.login, action.payload.password));
    if (!res) throw new Error('Login or password is invalid. Check it or register.');
    yield put(signInSuccess(res));
    yield put(setListSuccess(res.user.todos));
  } catch (error) {
    yield put(setLoginError({ active: true, message: error.message }));
  }
}

function* workerRegisterUser(action) {
  try {
    const res = yield call(() => regUser(action.payload.login, action.payload.password));
    if (!res) throw new Error('User with such login exists');
    yield put(registerUserSuccess(res));
  } catch (error) {
    // console.log("ERROR", error)
    yield put(setLoginError({ active: true, message: 'User with such login exists'}));
  }
}

function* loginSaga() {
  yield takeEvery('login/signIn', workerSignInUser);
  yield takeEvery('login/registerUser', workerRegisterUser);
}

export default loginSaga;
