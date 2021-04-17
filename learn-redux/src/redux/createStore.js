import isPlainObject from './utils/isPlainObject';
import ActionTypes from './utils/actionTypes';

export default function createStore(reducer, preloadedState) {
  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  let currentState = preloadedState;
  let currentReducer = reducer;
  let currentListeners = [];

  function getState() {
    return currentState;
  }

  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');
    }

    currentState = currentReducer(currentState, action);

    for (let i = 0; i < currentListeners.length; i++) {
      const listener = currentListeners[i];
      listener();
    }

    return action;
  }

  function subscribe(listener) {
    let isSubscribed = true;
    currentListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;
      const index = currentListeners.indexOf(listener);
      currentListeners.splice(index, 1);
    };
  }

  dispatch({ type: ActionTypes.INIT });

  return {
    getState,
    dispatch,
    subscribe
  };
};
