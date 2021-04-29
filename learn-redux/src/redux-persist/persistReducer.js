import * as types from './types';

const persistReducer = (persistConfig, reducer) => {
  const { key, storage } = persistConfig;
  const persistKey = `persist:${key}`;
  let isInitial = false;

  return (state, action) => {
    switch (action.type) {
      case types.PERSIST_INIT:
        const initialState = JSON.parse(storage.getItem(persistKey)) ?? state;
        isInitial = true;
        return initialState;
      default:
        const nextState = reducer(state, action);
        if (isInitial) {
          storage.setItem(persistKey, JSON.stringify(nextState));
        }
        return nextState;
    }
  };
};

export default persistReducer;
