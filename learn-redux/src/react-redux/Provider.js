import React from 'react';

import { ReactReduxContext } from './context';

export default class Provider extends React.Component {

  render() {
    const { store, children } = this.props;

    return (
      <ReactReduxContext.Provider value={{ store }}>
        {children}
      </ReactReduxContext.Provider>
    );
  }
};
