import React from 'react';
import { Router } from 'react-router';
import { ReactReduxContext } from 'react-redux';

import {
  LOCATION_CHANGE
} from './constants';

class ConnectedRouter extends React.Component {
  static contextType = ReactReduxContext;

  unListen = null;

  componentDidMount() {
    const { store } = this.context;
    const { history } = this.props;

    this.unListen = history.listen((location, action) => {
      store.dispatch({
        type: LOCATION_CHANGE,
        payload: {
          location,
          action
        }
      });
    });
  }

  componentWillUnmount() {
    this.unListen && this.unListen();
  }

  render() {
    const { history, children } = this.props;

    return (
      <Router history={history}>
        {children}
      </Router>
    );
  }
}

export default ConnectedRouter;
