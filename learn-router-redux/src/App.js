import React from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';

import history from './store/history';

import Home from './pages/Home';
import Counter from './pages/Counter';

function App() {

  return (
    <Router history={history}>
      <div className="nav">
        <Link to="/">Home</Link>
        <Link to="/counter">Counter</Link>
      </div>

      <div className="view">
        <Route path="/" exact component={Home} />
        <Route path="/counter" component={Counter} />
      </div>
    </Router>
  );
}

export default App;
