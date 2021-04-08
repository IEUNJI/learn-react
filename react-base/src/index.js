import React from './react';
import ReactDOM from './react-dom';

// 函数组件
function Welcome(props) {
  const { name, age } = props;

  return (
    <div>welcome {name} {age}!</div>
  );
}

// 类组件
class Hello extends React.Component {
  render() {
    const { name, age } = this.props;

    return (
      <div>hello {name} {age}!</div>
    );
  }
}

let element = React.createElement('h1', {
  className: 'title',
  style: {
    color: 'pink',
    fontSize: '50px'
  }
}, 'hello', React.createElement('span', null, 'world'));

element = React.createElement(Welcome, {
  name: 'ieunji',
  age: 18
});

element = React.createElement(Hello, {
  name: 'ieunji',
  age: 18
});

ReactDOM.render(element, document.getElementById('root'));
