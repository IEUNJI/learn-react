import React from 'react';
import { withRouter } from '../react-router-dom';

class Title extends React.Component {

  toHome = () => {
    const { history } = this.props;

    history.push('/');
  }

  render() {

    return (
      <h2 className="title" onClick={this.toHome}>
        React Router
      </h2>
    );
  }
}

export default withRouter(Title);
