import * as types from './types';

const persistStore = store => {
  const persistor = {
    ...store,
    initState: () => {
      store.dispatch({
        type: types.PERSIST_INIT
      });
    }
  };

  return persistor;
};

export default persistStore;
