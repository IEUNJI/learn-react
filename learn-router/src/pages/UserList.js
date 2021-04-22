import React from 'react';
import { Link } from '../react-router-dom';

class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userList: []
    };
  }

  componentDidMount() {
    const userList = JSON.parse(sessionStorage.getItem('ids')) ?? [];

    this.setState({
      userList
    });
  }

  render() {
    const { userList } = this.state;

    return (
      <div className="user-list">
        <div className="user-list-title">
          UserList
        </div>

        <div className="user-list-view">
          {
            userList.map(item => {
              const { id } = item;

              return (
                <div key={id}>
                  <Link to={`/user/detail/${id}`}>{id}</Link>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default UserList;
