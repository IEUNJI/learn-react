import React from 'react';

import { pathToRegexp } from 'path-to-regexp';

import RouterContext from './RouterContext';

class Switch extends React.Component {
  static contextType = RouterContext;

  render() {
    const { location } = this.context;
    const { pathname } = location;
    const children = React.Children.toArray(this.props.children);

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const { path, exact = false, to } = child.props;

      if (path) { // Route
        const paramNames = [];
        const regexp = pathToRegexp(path, paramNames, { end: exact });
        const result = pathname.match(regexp);

        if (result) {
          return child;
        }
      } else if (to) { // Redirect
        return child;
      }
    }

    return null;
  }
}

export default Switch;
