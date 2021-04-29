import React from 'react';

import Counter from './pages/Counter';
import CounterReducer from './pages/CounterReducer';
import CounterEffect from './pages/CounterEffect';
import Ref from './pages/Ref';
import Layout from './pages/Layout';
import CounterCustom from './pages/CounterCustom';

function App() {

  return (
    <React.Fragment>
      <CounterCustom />
    </React.Fragment>
  );
}

export default App;
