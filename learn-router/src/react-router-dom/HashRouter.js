import React from 'react';

import RouterContext from './RouterContext';

class HashRouter extends React.Component {
  locationState = undefined;
  blockMessageFunc = null;

  state = {
    location: {
      pathname: window.location.hash.slice(1),
      state: this.locationState
    },
    history: {
      push: to => {
        const { blockMessageFunc } = this;
        const { pathname, state } = this.handleTo(to);

        if (blockMessageFunc) {
          const result = window.confirm(blockMessageFunc({ pathname, state }));
          if (!result) return;
        }

        this.locationState = state;
        window.location.hash = pathname;
      },
      block: message => {
        this.blockMessageFunc = message;
      }
    }
  };

  onHashChange = () => {
    const { location } = this.state;

    location.pathname = window.location.hash.slice(1);
    location.state = this.locationState;

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
    window.location.hash = window.location.hash || '/';

    window.addEventListener('hashchange', this.onHashChange);
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.onHashChange);
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

export default HashRouter;
