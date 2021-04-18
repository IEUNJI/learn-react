import * as types from '../action-types';

export default {
  increment() {
    return { type: types.INCREMENT2 };
  },
  decrement() {
    return { type: types.DECREMENT2 };
  },
  asyncIncrement() {
    return (dispatch, getState) => {
      setTimeout(() => {
        dispatch({ type: types.INCREMENT2 });
      }, 1000);
    };
  },
  promiseIncrement() {
    return {
      type: types.INCREMENT2,
      payload: new Promise((resolve, reject) => {
        setTimeout(resolve, 1000);
      })
    };
  }
};
