import { createStore, applyMiddleware } from '../redux';

import reducer from './reducers';

import logger from './middlewares/logger';

// const store = createStore(reducer, {
//   counter1: 10,
//   counter2: 20
// });

const store = applyMiddleware(logger)(createStore)(reducer, {
  counter1: 10,
  counter2: 20
});

export default store;
