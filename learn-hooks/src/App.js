import React from 'react';

import Counter from './pages/Counter';
import CounterReducer from './pages/CounterReducer';
import CounterEffect from './pages/CounterEffect';

function App() {

  return (
    <React.Fragment>
      <CounterEffect />
    </React.Fragment>
  );
}

export default App;
