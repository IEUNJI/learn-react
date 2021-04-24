import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from '../connected-react-router';

import createReducer from './reducers';
import history from './history';

const store = createStore(createReducer(history), applyMiddleware(routerMiddleware(history)));

window.store = store;

export default store;
