import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';

const Layout = props => {
  const [color, setColor] = useState('red');

  const divRef = useRef();

  const styleObj = {
    width: '100px',
    height: '100px',
    background: color
  };

  useLayoutEffect(() => {
    console.log('useLayoutEffect color', color);
    // divRef.current.style.background = 'orange';
    // alert(color);
  });

  useEffect(() => {
    console.log('useEffect color', color);
    // divRef.current.style.background = 'orange';
    // alert(color);
  });

  return (
    <React.Fragment>
      <div ref={divRef} style={styleObj}></div>
      <button onClick={() => setColor('red')}>red</button>
      <button onClick={() => setColor('yellow')}>yellow</button>
      <button onClick={() => setColor('blue')}>blue</button>
    </React.Fragment>
  );
};

export default Layout;
