import { Element } from './element';
import { delegate, on, shouldDeepCompare, outerHTML, innerHTML } from './utils';

class Unit {
  constructor(element) {
    this._currentElement = element;
  }

  getMarkUp(reactid) {
    this._reactid = reactid;
  }
}

class TextUnit extends Unit {
  constructor(element) {
    super(element);
  }

  getMarkUp(reactid) {
    super.getMarkUp(reactid);

    return `<span data-reactid="${this._reactid}">${this._currentElement}</span>`;
  }

  update(nextElement) {
    if (this._currentElement !== nextElement) {
      this._currentElement = nextElement;

      innerHTML(this._reactid, this._currentElement);
    }
  }
}

class NativeUnit extends Unit {
  constructor(element) {
    super(element);
  }

  getMarkUp(reactid) {
    super.getMarkUp(reactid);

    const { type, props } = this._currentElement;

    let tagStart = `<${type} data-reactid="${this._reactid}" `;
    let childrenStr = '';
    let tagEnd = `</${type}>`;

    for (const propName in props) {
      if (propName.startsWith('on')) {
        const eventName = propName.slice(2).toLowerCase();

        delegate(`[data-reactid="${this._reactid}"]`, `${eventName}.${this._reactid}`, props[propName]);
      } else if (propName === 'style') {
        const styleStr = Object.entries(props.style).map(([key, value]) => {
          const attr = key.replace(/[A-Z]/g, matched => `-${matched.toLowerCase()}`);
          return `${attr}: ${value};`;
        }).join(' ');

        tagStart += `style="${styleStr}" `;
      } else if (propName === 'className') {
        tagStart += `class="${props.className}" `;
      } else if (propName === 'children') {
        if (props.children != null) {
          const children = Array.isArray(props.children) ? props.children : [props.children];

          const childrenMarkUp = children.map((child, index) => {
            const childUnit = createUnit(child);
            return childUnit.getMarkUp(`${this._reactid}.${index}`);
          }).join('');

          childrenStr += childrenMarkUp;
        }
      } else {
        tagStart += `${propName}="${props[propName]}" `;
      }
    }

    tagStart = tagStart.slice(0, -1);

    return tagStart + '>' + childrenStr + tagEnd;
  }
}

class CompositeUnit extends Unit {
  constructor(element) {
    super(element);
  }

  getMarkUp(reactid) {
    super.getMarkUp(reactid);

    const { type: Component, props } = this._currentElement;

    if (Component.isReactComponent) {
      const componentInstance = new Component(props);

      this._componentInstance = componentInstance;
      this._componentInstance._currentUnit = this;

      componentInstance.componentWillMount?.();

      const renderedElement = componentInstance.render();
      const renderedUnit = createUnit(renderedElement);

      this._renderedUnit = renderedUnit;

      const renderedMarkUp = renderedUnit.getMarkUp(this._reactid);

      on('mounted', () => {
        componentInstance.componentDidMount?.();
      });

      return renderedMarkUp;
    } else {
      const renderedElement = Component(props);
      const renderedUnit = createUnit(renderedElement);
      const renderedMarkUp = renderedUnit.getMarkUp(this._reactid);
      return renderedMarkUp;
    }
  }

  update(nextElement, partialState) {
    this._currentElement = nextElement || this._currentElement;

    const nextState = Object.assign(this._componentInstance.state, partialState);
    const nextProps = this._currentElement.props;

    if (
      this._componentInstance.shouldComponentUpdate &&
      !this._componentInstance.shouldComponentUpdate(nextProps, nextState)
    ) {
      return;
    }

    const prevRenderedUnit = this._renderedUnit;
    const prevRenderedElement = prevRenderedUnit._currentElement;

    const nextRenderElement = this._componentInstance.render();

    if (shouldDeepCompare(prevRenderedElement, nextRenderElement)) {
      prevRenderedUnit.update(nextRenderElement);
    } else {
      this._renderedUnit = createUnit(nextRenderElement);
      const nextMarkUp = this._renderedUnit.getMarkUp(this._reactid);

      outerHTML(this._reactid, nextMarkUp)
    }

    this._componentInstance.componentDidUpdate?.();
  }
}

function createUnit(element) {
  if (typeof element === 'string' || typeof element === 'number') {
    return new TextUnit(element);
  }

  if (element instanceof Element && typeof element.type === 'string') {
    return new NativeUnit(element);
  }

  if (element instanceof Element && typeof element.type === 'function') {
    return new CompositeUnit(element);
  }
}

export {
  createUnit
};
