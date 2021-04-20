import React from 'react';

class UserAdd extends React.Component {
  constructor(props) {
    super(props);

    this.input = React.createRef();
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

    return (
      <div className="user-add">
        <div className="user-add-title">
          UserAdd
        </div>

        <div className="user-add-view">
          <input type="text" ref={this.input} />
          <button onClick={this.add}>add</button>
        </div>
      </div>
    );
  }
}

export default UserAdd;
