function render(element, parentNode) {
  if (typeof element !== 'object') {
    parentNode.appendChild(document.createTextNode(element));
    return;
  }

  const { type, props } = element;

  if (typeof type === 'function') {
    if (type.isReactComponent) {
      render(new type(props).render(), parentNode);
    } else {
      render(type(props), parentNode);
    }
    return;
  }

  const domElement = document.createElement(type);

  for (let propName in props) {
    if (props.hasOwnProperty(propName)) {
      if (propName === 'className') {
        domElement.className = props[propName];
      } else if (propName === 'style') {
        const styleObject = props[propName];

        for (let styleName in styleObject) {
          if (styleObject.hasOwnProperty(styleName)) {
            let standardName = styleName;

            if (possibleStandardNames.hasOwnProperty(styleName)) {
              standardName = possibleStandardNames[styleName];
            }

            domElement.style[standardName] = styleObject[styleName];
          }
        }
      } else if (propName === 'children') {
        if (props.children != null) {
          const children = Array.isArray(props.children) ? props.children : [props.children];

          children.forEach(child => {
            render(child, domElement);
          });
        }
      } else {
        domElement.setAttribute(propName, props[propName]);
      }
    }
  }

  parentNode.appendChild(domElement);
}

// 属性转换
const possibleStandardNames = {
  'fontSize': 'font-size'
};

export default {
  render
};
