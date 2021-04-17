import React from 'react';
import { bindActionCreators } from 'redux';

import store from './store';
import actions from './store/actions/counter2';

const boundActions = bindActionCreators(actions, store.dispatch);

class Counter2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      number: store.getState().counter2
    };

    this.unsubscribe = null;
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        number: store.getState().counter2
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
        <span>计数器2</span>
        <button onClick={boundActions.increment}>+</button>
        <button onClick={boundActions.decrement}>-</button>
        <span>{number}</span>
      </div>
    );
  }
}

export default Counter2;
