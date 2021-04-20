import React from 'react';

import RouterContext from './RouterContext';

class Redirect extends React.Component {
  static contextType = RouterContext;

  componentDidMount() {
    const { history } = this.context;
    const { to } = this.props;

    history.push(to);
  }

  render() {

    return null;
  }
}

export default Redirect;
