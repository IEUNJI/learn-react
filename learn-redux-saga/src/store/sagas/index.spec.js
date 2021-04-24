import test from 'tape';
import { delay, put } from 'redux-saga/effects';

import * as types from '../action-types';
import { asyncIncrement } from './asyncIncrement';

test('asyncIncrement saga test', assert => {
  const iterator = asyncIncrement();

  assert.deepEqual(
    iterator.next().value,
    delay(1500),
    'The first execution should return a promise with a delay of 1.5s'
  );

  assert.deepEqual(
    iterator.next().value,
    put({ type: types.INCREMENT }),
    'The second execution should return an increase action'
  );

  assert.end();
});
