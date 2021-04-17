import { createStore } from 'redux';

import reducer from './reducers';

const store = createStore(reducer, {
  counter1: 10,
  counter2: 20
});

export default store;
