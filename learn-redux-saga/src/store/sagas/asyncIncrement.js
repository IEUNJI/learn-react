import { takeEvery, delay, put } from 'redux-saga/effects';

import * as types from '../action-types';

export function* asyncIncrement() {
  yield delay(1500);
  yield put({ type: types.INCREMENT });
}

export function* watchAsyncIncrement() {
  yield takeEvery(types.ASYNC_INCREMENT, asyncIncrement);
}
