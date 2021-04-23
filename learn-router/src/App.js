import React from 'react';
import { HashRouter as Router, Route, Link } from './react-router-dom';

import Title from './pages/Title';
import Home from './pages/Home';
import User from './pages/User';
import Profile from './pages/Profile';
import Login from './pages/Login';

import Protected from './components/Protected';
import MenuLink from './components/MenuLink';

// import './reg';
import './App.css';

function App(props) {

  return (
    <Router>
      <Title />
      <div className="nav">
        <MenuLink to="/" exact>首页</MenuLink>
        <MenuLink to="/user">用户管理</MenuLink>
        <MenuLink to="/profile">个人中心</MenuLink>
      </div>

      <div className="view">
        <Route path="/" component={Home} exact />
        <Route path="/user" component={User} />
        <Protected path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
      </div>
    </Router>
  );
}

export default App;
