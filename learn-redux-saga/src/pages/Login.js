import React from 'react';
import { connect } from 'react-redux';

import actionCreators from '../store/actionCreators/login';

class Login extends React.Component {

  onLogin = event => {
    event.preventDefault();

    const { login } = this.props;
    const { elements } = event.target;

    login(elements.username.value, elements.password.value);
  }

  onLogout = event => {
    event.preventDefault();

    const { logout } = this.props;

    logout();
  }

  cancel = event => {
    event.preventDefault();

    const { logout } = this.props;

    logout();
  }

  render() {
    const { username } = this.props;

    const loginForm = (
      <form onSubmit={this.onLogin}>
        <label htmlFor="username">用户名：<input key="login_username" type="text" id="username" /></label>
        <label htmlFor="password">密码：<input key="login_password" type="password" id="password" /></label>
        <button type="submit">Login</button>
        <button onClick={this.cancel}>Cancel</button>
      </form>
    );

    const logoutForm = (
      <form onSubmit={this.onLogout}>
        <label>用户名：<input key="logout_username" type="text" value={username} disabled /></label>
        <button type="submit">Logout</button>
      </form>
    );

    return (
      <div className="login">
        <h3>Login</h3>
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
