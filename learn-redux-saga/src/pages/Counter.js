import React from 'react';
import { connect } from 'react-redux';

import actionCreators from '../store/actionCreators/counter';

class Counter extends React.Component {

  render() {
    const { number, increment, asyncIncrement, decrement } = this.props;

    return (
      <div className="counter">
        <h3>Counter</h3>
        <div>{number}</div>
        <button onClick={increment}>+</button>
        <button onClick={asyncIncrement}>async +</button>
        <button onClick={decrement}>-</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.counter;
};
const mapDispatchToProps = actionCreators;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
