import { take, call, put, fork, cancel } from 'redux-saga/effects';

import * as types from '../action-types';
import * as API from '../../api';

export function* login(username, password) {
  try {
    const token = yield call(API.login, username, password);
    yield put({ type: types.LOGIN_SUCCESS, payload: token });
  } catch (error) {
    alert(error);
    yield put({ type: types.LOGIN_ERROR, error });
  }
}

export function* watchLogin() {
  while (true) {
    const { payload: { username, password } } = yield take(types.LOGIN);
    const task = yield fork(login, username, password);

    yield take(types.LOGOUT);
    yield cancel(task);
    yield put({ type: types.LOGOUT_SUCCESS });
  }
}
