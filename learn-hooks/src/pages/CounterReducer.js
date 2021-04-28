import React, { useReducer, createContext, useContext } from 'react';

const CounterContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return { number: state.number + 1 };
    default:
      return state;
  }
};

const SubCounter = props => {
  const { state, dispatch } = useContext(CounterContext);

  const add = () => {
    setTimeout(() => {
      dispatch({ type: 'ADD' });
    }, 1000);
  };

  return (
    <React.Fragment>
      <button onClick={add}>+</button>
      <span>{state.number}</span>
    </React.Fragment>
  );
};

const CounterReducer = props => {
  const [state, dispatch] = useReducer(reducer, 0, number => {
    console.log('init reducer', number);

    return { number };
  });

  return (
    <div className="counter-reducer">
      <div>CounterReducer</div>
      <CounterContext.Provider value={{ state, dispatch }}>
        <SubCounter />
      </CounterContext.Provider>
    </div>
  );
};

export default CounterReducer;
