import React, { useState, useEffect } from 'react';

// 逻辑复用的方式：高阶组件、render props、自定义 hooks

const useNumber = () => {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setNumber(num => num + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return [number, setNumber];
};

const Counter1 = () => {
  const [number, setNumber] = useNumber();

  return (
    <React.Fragment>
      <button onClick={() => setNumber(number + 1)}>{number}</button>
    </React.Fragment>
  );
};

const Counter2 = () => {
  const [number, setNumber] = useNumber();

  return (
    <React.Fragment>
      <div onClick={() => setNumber(number + 1)}>{number}</div>
    </React.Fragment>
  );
};

const CounterCustom = () => {

  return (
    <React.Fragment>
      <Counter1 />
      <Counter2 />
    </React.Fragment>
  );
};

export default CounterCustom;
