window.trigger = function (event, method, ...others) {
  batchingStrategy.isBatchingUpdates = true; // 开启批量更新模式

  const { component } = event.target;
  component[method].call(component, event, ...others);

  batchingStrategy.isBatchingUpdates = false;
  batchingStrategy.batchedUpdates();
};

const batchingStrategy = {
  isBatchingUpdates: false, // 默认为非批量更新模式
  dirtyComponents: [], // 脏组件（组件的状态与界面渲染不一致）
  batchedUpdates() {
    const dirtyComponents = [...new Set(batchingStrategy.dirtyComponents)]; // 去重

    dirtyComponents.forEach(component => {
      component.updateComponent();
    });

    batchingStrategy.dirtyComponents = [];
  }
};

class Updater {
  constructor(component) {
    this.component = component;
    this.pendingStates = [];
  }

  addState(partialState) {
    this.pendingStates.push(partialState);

    if (batchingStrategy.isBatchingUpdates) {
      batchingStrategy.dirtyComponents.push(this.component);
    } else {
      this.component.updateComponent();
    }
  }
}

class Component {
  constructor(props) {
    this.props = props;
    this.updater = new Updater(this);
  }

  createDOMFromDOMString() {
    const domString = this.render();

    const div = document.createElement('div');
    div.innerHTML = domString;
    this.domElement = div.children[0];

    this.domElement.component = this;

    return this.domElement;
  }

  setState(partialState) {
    this.updater.addState(partialState);
  }

  updateComponent() {
    Object.assign(this.state, ...this.updater.pendingStates);

    this.updater.pendingStates = [];

    const oldElement = this.domElement;
    const newElement = this.createDOMFromDOMString();

    oldElement.parentElement.replaceChild(newElement, oldElement);
  }

  mount(container) {
    container.appendChild(this.createDOMFromDOMString());
  }
}

class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: 0
    };
  }

  // React执行结果：0 0 2 3
  add(event, step = 1) {
    this.setState({
      number: this.state.number + step
    });
    console.log(this.state);

    this.setState({
      number: this.state.number + step
    });
    console.log(this.state);

    setTimeout(() => {
      this.setState({
        number: this.state.number + step
      });
      console.log(this.state);

      this.setState({
        number: this.state.number + step
      });
      console.log(this.state);
    }, 10);
  }

  render() {
    const { name } = this.props;
    const { number } = this.state;

    return `
      <button onclick="trigger(event, 'add')">${name} number: ${number}</button>
    `;
  }
}
