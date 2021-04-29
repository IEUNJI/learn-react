import { createStore, applyMiddleware } from '../redux';

import reducer from './reducers';

import thunk from './middlewares/thunk';
import promise from './middlewares/promise';
import logger from './middlewares/logger';
import { persistStore, persistReducer } from '../redux-persist';
import storage from '../redux-persist/lib/storage';

// const store = createStore(reducer, {
//   counter1: 10,
//   counter2: 20
// });

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = applyMiddleware(thunk, promise, logger)(createStore)(persistedReducer, {
  counter1: 10,
  counter2: 20
});

const persistor = persistStore(store);

window.store = store;

export {
  store,
  persistor
};
