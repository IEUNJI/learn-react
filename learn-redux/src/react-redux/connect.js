import React from 'react';

import { bindActionCreators } from '../redux';
import { ReactReduxContext } from './context';

export default function connect(mapStateToProps, mapDispatchToProps) {

  return function (WrappedComponent) {

    return class ConnectComponent extends React.Component {
      static contextType = ReactReduxContext;

      constructor(props, context) {
        super(props);

        const { store } = context;

        this.state = mapStateToProps(store.getState());
      }

      componentDidMount() {
        const { store } = this.context;

        this.unsubscribe = store.subscribe(() => {
          this.setState(mapStateToProps(store.getState()));
        });
      }

      componentWillUnmount() {
        this.unsubscribe && this.unsubscribe();
      }

      render() {
        const { store } = this.context;

        const boundActions = bindActionCreators(mapDispatchToProps, store.dispatch);

        return (
          <WrappedComponent {...this.props} {...this.state} {...boundActions} />
        );
      }
    };
  };
};
