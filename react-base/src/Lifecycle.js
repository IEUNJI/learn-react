import React from 'react';

class Child extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      info: {
        name: 'ieunji'
      }
    };
  }

  changeHandler = () => {
    this.setState({
      info: null
    });
  }

  render() {
    const { info } = this.state;

    return (
      <div className="child">
        <button onClick={this.changeHandler}>Child</button>
        <span>{info.name}</span>
      </div>
    );
  }
}

class Lifecycle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      errorMsg: ''
    };
  }

  static getDerivedStateFromError(error) {
    console.log('static getDerivedStateFromError', arguments);

    return {
      hasError: true,
      errorMsg: error.message
    };
  }

  componentDidCatch(error, info) {
    console.log('componentDidCatch', arguments);

    this.setState({
      hasError: true,
      errorMsg: error.message
    });
  }

  render() {
    const { hasError, errorMsg } = this.state;

    if (hasError) {
      return (
        <mark>{errorMsg}</mark>
      );
    }

    return (
      <React.Fragment>
        <Child />
      </React.Fragment>
    );
  }
}

export default Lifecycle;
