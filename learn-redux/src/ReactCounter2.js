import React from 'react';
import { connect } from 'react-redux';

import actions from './store/actions/counter2';

class Counter2 extends React.Component {

  render() {
    const { number, increment, decrement } = this.props;

    return (
      <div>
        <span>计数器2</span>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <span>{number}</span>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    number: state.counter2
  };
};

const mapDispatchToProps = actions;


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter2);
