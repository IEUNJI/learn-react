import React from 'react';

import RouterContext from './RouterContext';

class Link extends React.Component {
  static contextType = RouterContext;

  onLinkClick = event => {
    event.preventDefault();

    const { history } = this.context;
    const { to } = this.props;

    history.push(to);
  }

  render() {
    const { to, children } = this.props;

    const href = typeof to === 'string' ? to : to.pathname;

    return (
      <a href={`#${href}`} onClick={this.onLinkClick}>
        {children}
      </a>
    );
  }
}

export default Link;
