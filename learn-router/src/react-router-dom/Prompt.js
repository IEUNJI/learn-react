import React from 'react';

import RouterContext from './RouterContext';

class Prompt extends React.Component {
  static contextType = RouterContext;

  componentWillUnmount() {
    const { history } = this.context;

    history.block(null);
  }

  render() {
    const { history } = this.context;
    const { when, message } = this.props;

    if (when) {
      history.block(message);
    } else {
      history.block(null);
    }

    return null;
  }
}

export default Prompt;
