class Element {
  constructor(type, props) {
    this.type = type;
    this.props = props;
  }
}

function createElement(type, props, children) {
  props = props ?? {};

  const childrenLength = arguments.length - 2;

  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    props.children = Array.from(arguments).slice(2);
  }

  return new Element(type, props);
}

export {
  Element,
  createElement
};
