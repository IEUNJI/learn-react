import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Counter from './pages/Counter';

function App() {

  return (
    <Router>
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
