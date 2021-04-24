import {
  CALL_HISTORY_METHOD
} from './constants';

export default function routerMiddleware(history) {

  return ({ dispatch, getState }) => next => action => {
    const { type, payload } = action;

    if (type === CALL_HISTORY_METHOD) {
      const { method, path } = payload;

      history[method](path);
    } else {
      next(action);
    }
  };
};
