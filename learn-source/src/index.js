import React from './react';

class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      number: 0
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        number: this.state.number + 1
      });
    }, 1000);
  }

  render() {
    return this.state.number;
  }
}

const element = React.createElement(Counter, { title: '计数器' });

React.render(element, document.getElementById('root'));
