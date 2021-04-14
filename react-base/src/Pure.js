import React from 'react';

function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let i = 0; i < keysA.length; i++) {
    if (!objB.hasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

class PureComponent extends React.Component {
  isPureReactComponent = true;

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }
}

function memo(Func) {
  return class extends React.PureComponent {
    render() {
      return Func(this.props);
    }
  };
}

const Title2 = React.memo(function (props) {
  console.log('title2 render');
  const { title } = props;

  return (
    <h3>{title}</h3>
  );
});

class Title extends React.PureComponent {

  render() {
    console.log('title render');
    const { title } = this.props;

    return (
      <h3>{title}</h3>
    );
  }
}

class Number extends React.PureComponent {

  render() {
    console.log('number render');
    const { number } = this.props;

    return (
      <div>{number}</div>
    );
  }
}

class Pure extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      title: '计数器',
      number: 0
    };
  }

  add = () => {
    this.setState({
      number: this.state.number + 1
    });
  }

  render() {
    console.log('pure render');
    const { title, number } = this.state;

    return (
      <React.Fragment>
        <Title title={title} />
        <Title2 title={title} />
        <Number number={number} />
        <button onClick={this.add}>+</button>
      </React.Fragment>
    );
  }
}

export default Pure;
