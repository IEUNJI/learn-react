import React from 'react';

import Route from './Route';

export default function (Component) {

  return function withRouter(props) {

    const render = contextProps => {
      return <Component {...props} {...contextProps} />;
    };

    return (
      <Route path="/" render={render} />
    );
  };
};
