import React from 'react';

class UserDetail extends React.Component {

  render() {
    const { match } = this.props;
    const { params } = match;

    return (
      <div className="user-detail">
        {params.id}
      </div>
    );
  }
}

export default UserDetail;
