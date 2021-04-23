import React from 'react';
import { connect } from 'react-redux';

import actionCreators from '../store/actionCreators/counter';

class Counter extends React.Component {

  render() {
    const { number, increment, decrement, goHome } = this.props;

    return (
      <div className="counter">
        <div>{number}</div>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <button onClick={goHome}>goHome</button>
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
