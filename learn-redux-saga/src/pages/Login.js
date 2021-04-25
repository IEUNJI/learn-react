import React from 'react';
import { connect } from 'react-redux';

import actionCreators from '../store/actionCreators/login';

class Login extends React.Component {

  onLogin = event => {
    event.preventDefault();
  }

  onLogout = event => {
    event.preventDefault();
  }

  render() {
    const { username } = this.props;

    const loginForm = (
      <form onSubmit={this.onLogin}>
        <label htmlFor="username">用户名：<input type="text" id="username" /></label>
        <label htmlFor="password">密码：<input type="password" id="password" /></label>
        <button type="submit">Login</button>
      </form>
    );

    const logoutForm = (
      <form onSubmit={this.onLogout}>
        <label>用户名：<input type="text" value={username} disabled /></label>
        <button type="submit">Logout</button>
      </form>
    );

    return (
      <div className="login">
        {
          username ? logoutForm : loginForm
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.login;
};
const mapDispatchToProps = actionCreators;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
