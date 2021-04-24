import { all } from 'redux-saga/effects';

import { watchAsyncIncrement } from './asyncIncrement';

export default function* rootSaga() {
  yield all([
    watchAsyncIncrement()
  ]);
};
