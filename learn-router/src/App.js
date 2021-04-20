import React from 'react';
import { HashRouter as Router, Route, Link } from './react-router-dom';

import Home from './pages/Home';
import User from './pages/User';
import Profile from './pages/Profile';

// import './reg';

function App(props) {

  return (
    <Router>
      <div className="nav">
        <Link to="/">首页</Link>
        <Link to="/user">用户管理</Link>
        <Link to="/profile">个人中心</Link>
      </div>

      <div className="view">
        <Route path="/" component={Home} exact />
        <Route path="/user" component={User} />
        <Route path="/profile" component={Profile} />
      </div>
    </Router>
  );
}

export default App;
