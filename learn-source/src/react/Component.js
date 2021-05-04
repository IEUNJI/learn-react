class Component {
  static isReactComponent = true;

  constructor(props) {
    this.props = props;
  }

  setState(partialState) {
    this._currentUnit.update(null, partialState);
  }
}

export {
  Component
};
