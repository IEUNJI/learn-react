import React, { useState, memo, useMemo, useCallback } from 'react';

const SubCounter = memo(props => {
  console.log('sub-counter render');

  const { data, onNumberChange } = props;

  return (
    <div className="sub-counter">
      <button onClick={onNumberChange}>+</button>
      <span>{data.number}</span>
    </div>
  );
});

function Counter(props) {
  console.log('counter render');

  const [number, setNumber] = useState(0);
  // const [number, setNumber] = useState(() => {
  //   console.log('init number');

  //   return 0;
  // });
  const [title, setTitle] = useState('counter');

  const onTitleChange = event => {
    setTitle(event.target.value);
  };

  const data = useMemo(() => {
    return { number };
  }, [number]);

  const onNumberChange = useCallback(() => {
    setNumber(number + 1);
    // setNumber(num => num + 1);
  }, [number]);

  return (
    <div className="counter">
      <div>{title}</div>
      <input type="text" value={title} onChange={onTitleChange} />
      <SubCounter data={data} onNumberChange={onNumberChange} />
    </div>
  );
}

export default Counter;
