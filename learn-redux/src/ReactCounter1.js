import React from 'react';
import { bindActionCreators } from 'redux';

import store from './store';
import actions from './store/actions/counter1';

const boundActions = bindActionCreators(actions, store.dispatch);

class Counter1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      number: store.getState().counter1
    };

    this.unsubscribe = null;
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        number: store.getState().counter1
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe?.();
  }

  render() {
    const { number } = this.state;

    return (
      <div>
        <span>计数器1</span>
        <button onClick={boundActions.increment}>+</button>
        <button onClick={boundActions.decrement}>-</button>
        <span>{number}</span>
      </div>
    );
  }
}

export default Counter1;
