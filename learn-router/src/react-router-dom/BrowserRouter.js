import React from 'react';

import RouterContext from './RouterContext';

const rawPushState = window.history.pushState;
window.history.pushState = function pushState(state, title, url) {
  rawPushState.call(this, state, title, url);
  window.onpushstate(url, state);
};

class BrowserRouter extends React.Component {
  blockMessageFunc = null;

  state = {
    location: {
      pathname: window.location.pathname,
      state: undefined
    },
    history: {
      push: to => {
        const { blockMessageFunc } = this;
        const { pathname, state } = this.handleTo(to);

        if (blockMessageFunc) {
          const result = window.confirm(blockMessageFunc({ pathname, state }));
          if (!result) return;
        }

        window.history.pushState(state, '', pathname)
      },
      block: message => {
        this.blockMessageFunc = message;
      }
    }
  };

  onPopState = event => {
    const { location } = this.state;

    location.pathname = window.location.pathname;
    location.state = event.state;

    this.setState({
      location
    });
  }

  onPushState = (pathname, state) => {
    const { location } = this.state;

    location.pathname = pathname;
    location.state = state;

    this.setState({
      location
    });
  }

  handleTo = to => {
    if (typeof to === 'string') {
      return {
        pathname: to,
        state: undefined
      };
    }
    return to;
  }

  componentDidMount() {
    window.onpopstate = this.onPopState;
    window.onpushstate = this.onPushState;
  }

  componentWillUnmount() {
    window.onpopstate = null;
    window.onpushstate = null;
  }

  render() {
    const { children } = this.props;

    return (
      <RouterContext.Provider value={this.state}>
        {children}
      </RouterContext.Provider>
    );
  }
}

export default BrowserRouter;
