import React from 'react';
import { Route, Redirect } from '../react-router-dom';

function Protected({ component: Component, ...rest }) {

  const render = props => {
    if (sessionStorage.getItem('login') === 'true') {

      return <Component {...props} />;
    } else {
      const info = {
        pathname: '/login',
        state: {
          from: props.location.pathname
        }
      };

      return <Redirect to={info} />;
    }
  };

  return (
    <Route {...rest} render={render} />
  );
}

export default Protected;
