import * as types from '../action-types';

export default {
  increment() {
    return { type: types.INCREMENT };
  },
  asyncIncrement() {
    return { type: types.ASYNC_INCREMENT };
  },
  decrement() {
    return { type: types.DECREMENT };
  }
};
