import React from 'react';

import { Route, Link } from '../react-router-dom';

function MenuLink({ to, exact, children: child }) {

  const children = props => {

    return (
      <Link to={to} className={props.match ? 'active' : ''}>{child}</Link>
    );
  };

  return (
    <Route path={to} exact={exact} children={children} />
  );
}

export default MenuLink;
