import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from '../connected-react-router';

import createReducer from './reducers';
import history from './history';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(createReducer(history), composeEnhancers(applyMiddleware(routerMiddleware(history))));

window.store = store;

export default store;
