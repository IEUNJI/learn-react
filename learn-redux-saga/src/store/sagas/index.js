import { all } from 'redux-saga/effects';

import { watchAsyncIncrement } from './asyncIncrement';
import { watchLogin } from './login';

export default function* rootSaga() {
  yield all([
    watchAsyncIncrement(),
    watchLogin()
  ]);
};
