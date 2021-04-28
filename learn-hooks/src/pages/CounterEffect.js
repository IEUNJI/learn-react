import React, { useState, useEffect } from 'react';

const CounterEffect = props => {
  const [number, setNumber] = useState(0);

  const add = () => {
    setNumber(number + 1);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      console.log('timer', timer);

      setNumber(number + 1);
    }, 1000);

    console.log('effect', timer);

    return () => {
      console.log('clear effect timer', timer);

      clearInterval(timer);
    };
  }, [number]);

  return (
    <div className="counter-effect">
      <button onClick={add}>+</button>
      <span>{number}</span>
    </div>
  );
};

export default CounterEffect;
