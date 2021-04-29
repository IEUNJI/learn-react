import React from 'react';

export class PersistGate extends React.Component {

  componentDidMount() {
    const { persistor } = this.props;

    persistor.initState();
  }

  render() {
    const { children } = this.props;

    return children;
  }
};
