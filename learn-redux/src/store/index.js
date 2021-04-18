import { createStore, applyMiddleware } from '../redux';

import reducer from './reducers';

import thunk from './middlewares/thunk';
import promise from './middlewares/promise';
import logger from './middlewares/logger';

// const store = createStore(reducer, {
//   counter1: 10,
//   counter2: 20
// });

const store = applyMiddleware(thunk, promise, logger)(createStore)(reducer, {
  counter1: 10,
  counter2: 20
});

export default store;
