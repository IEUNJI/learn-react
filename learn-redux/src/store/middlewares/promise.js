function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

export default function promiseMiddleware({ dispatch }) {
  return next => action => {
    if (isPromise(action.payload)) {
      return action.payload.then(result => {
        return dispatch({ ...action, payload: result });
      }).catch(error => {
        dispatch({ ...action, payload: error, error: true });
        return Promise.reject(error);
      });
    } else {
      return next(action);
    }
  };
};
