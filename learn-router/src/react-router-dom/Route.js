import React from 'react';

import { pathToRegexp } from 'path-to-regexp';

import RouterContext from './RouterContext';

class Route extends React.Component {
  static contextType = RouterContext;

  render() {
    const { location } = this.context;
    const { path, component: Component, exact = false } = this.props;
    const { pathname } = location;

    const paramNames = [];
    const regexp = pathToRegexp(path, paramNames, { end: exact });
    const result = pathname.match(regexp);

    if (result) {
      const [url, ...values] = result;

      const params = paramNames.reduce((acc, item, index) => {
        acc[paramNames[index]['name']] = values[index];
        return acc;
      }, {});

      const props = {
        ...this.context,
        match: {
          params,
          path,
          url,
          isExact: pathname === url
        }
      };

      return <Component {...props} />;
    }

    return null;
  }
}

export default Route;
