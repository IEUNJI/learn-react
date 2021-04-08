function createElement(type, config, children) {
  let propName;

  const props = {};

  if (config != null) {
    for (propName in config) {
      if (config.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  const childrenLength = arguments.length - 2;

  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    const childArray = Array.from(arguments).slice(2);
    props.children = childArray;
  }

  return ReactElement(type, props);
}

function ReactElement(type, props) {
  const element = {
    type,
    props
  };

  return element;
}

class Component {
  static isReactComponent = true; // 类组件标识

  constructor(props) {
    this.props = props;
  }
}

export default {
  createElement,
  Component
};
