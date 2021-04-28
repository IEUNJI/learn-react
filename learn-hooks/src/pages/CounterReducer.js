import React, { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return { number: state.number + 1 };
    default:
      return state;
  }
};

const CounterReducer = props => {
  const [state, dispatch] = useReducer(reducer, 0, number => {
    console.log('init reducer', number);

    return { number };
  });

  const { number } = state;

  const add = () => {
    setTimeout(() => {
      dispatch({ type: 'ADD' });
    }, 1000);
  };

  return (
    <div className="counter-reducer">
      <div>CounterReducer</div>
      <button onClick={add}>+</button>
      <span>{number}</span>
    </div>
  );
};

export default CounterReducer;
