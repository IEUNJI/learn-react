import React from 'react';

import { Prompt } from '../react-router-dom';

class UserAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blocking: false
    };

    this.input = React.createRef();
  }

  changeBlocking = event => {
    this.setState({
      blocking: event.target.value.length > 0
    });
  }

  add = () => {
    const { history } = this.props;

    const id = this.input.current.value;
    this.input.current.value = '';

    if (!id) return;

    const ids = JSON.parse(sessionStorage.getItem('ids')) ?? [];
    ids.push({ id });
    sessionStorage.setItem('ids', JSON.stringify(ids));

    history.push('/user/list');
  }

  render() {
    const { blocking } = this.state;

    return (
      <div className="user-add">
        <div className="user-add-title">
          UserAdd
        </div>

        <div className="user-add-view">
          <input type="text" ref={this.input} onChange={this.changeBlocking} />
          <button onClick={this.add}>add</button>
        </div>

        <Prompt when={blocking} message={location => `确定要跳转至${location.pathname}吗？`} />
      </div>
    );
  }
}

export default UserAdd;
