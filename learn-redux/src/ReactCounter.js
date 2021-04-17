import React from 'react';
import { bindActionCreators } from 'redux';

import store from './store';
import actions from './store/actions';

const boundActions = bindActionCreators(actions, store.dispatch);

class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      number: store.getState()
    };

    this.unsubscribe = null;
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        number: store.getState()
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe?.();
  }

  render() {
    const { number } = this.state;

    return (
      <React.Fragment>
        <span>计数器</span>
        <button onClick={boundActions.increment}>+</button>
        <button onClick={boundActions.decrement}>-</button>
        <span>{number}</span>
      </React.Fragment>
    );
  }
}

export default Counter;
