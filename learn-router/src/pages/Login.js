import React from 'react';

class Login extends React.Component {

  login = () => {
    const { location, history } = this.props;

    sessionStorage.setItem('login', 'true');

    if (location.state) {
      history.push(location.state.from);
    } else {
      history.push('/');
    }
  }

  render() {

    return (
      <div className="login">
        <div className="login-title">
          Login
        </div>
        <div className="login-view">
          <button onClick={this.login}>login</button>
        </div>
      </div>
    );
  }
}

export default Login;
