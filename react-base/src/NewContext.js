import React from 'react';

function createContext(defaultValue) {
  class Provider extends React.Component {
    static value = defaultValue;

    state = {};

    static getDerivedStateFromProps(props) {
      Provider.value = props.value;
      return null;
    }

    render() {
      return this.props.children;
    }
  }

  class Consumer extends React.Component {

    render() {
      return this.props.children(Provider.value);
    }
  }

  return {
    $$typeof: Symbol.for('react.context'),
    Provider,
    Consumer
  };
}

const ColorContext = React.createContext({
  color: 'black',
  toggleColor: () => { }
});

class NewContext extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: 'orange',
      toggleColor: this.toggleColor
    };
  }

  toggleColor = () => {
    this.setState({
      color: this.state.color === 'black' ? 'orange' : 'black'
    });
  }

  render() {
    return (
      <React.Fragment>
        <ColorContext.Provider value={this.state}>
          <Page />
          <Page />
        </ColorContext.Provider>
      </React.Fragment>
    );
  }
}

class Page extends React.Component {
  static contextType = ColorContext;

  // contextType写法
  render() {
    // this.context = this.constructor.contextType.Provider.value;
    const { color, toggleColor } = this.context;

    return (
      <div style={{ color }} onClick={toggleColor}>
        Page
      </div>
    );
  }

  // Consumer写法
  // render() {

  //   return (
  //     <ColorContext.Consumer>
  //       {context => {
  //         const { color, toggleColor } = context;

  //         return (
  //           <div style={{ color }} onClick={toggleColor}>
  //             Page(Consumer)
  //           </div>
  //         );
  //       }}
  //     </ColorContext.Consumer>
  //   );
  // }
}

export default NewContext;
