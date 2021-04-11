import React from 'react';

import ForwardRef from './ForwardRef';
import Lifecycle from './Lifecycle';
import Snapshot from './Snapshot';
import NewContext from './NewContext';

function App(props) {

  return (
    <React.Fragment>
      <NewContext />
    </React.Fragment>
  );
}

export default App;
