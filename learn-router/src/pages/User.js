import React from 'react';
import { HashRouter as Router, Route, Link, Switch, Redirect } from '../react-router-dom';

import UserAdd from './UserAdd';
import UserList from './UserList';
import UserDetail from './UserDetail';

class User extends React.Component {

  render() {

    return (
      // <Router>
        <div className="user">
          <div className="user-title">User</div>

          <div className="user-nav">
            <Link to="/user/list">用户列表</Link>
            <Link to="/user/add">添加用户</Link>
          </div>

          <div className="user-view">
            <Switch>
              <Route path="/user/list" component={UserList} />
              <Route path="/user/add" component={UserAdd} />
              <Route path="/user/detail/:id" component={UserDetail} />
              <Redirect to="/user/list" />
            </Switch>
          </div>
        </div>
      // </Router>
    );
  }
}

export default User;
