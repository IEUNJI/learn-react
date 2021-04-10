import React from 'react';

class FocusInput extends React.Component {
  constructor(props) {
    super(props);

    this.textInputIns = React.createRef();
  }

  focusHandler = () => {
    this.textInputIns.current.focus();
  }

  render() {

    return (
      <React.Fragment>
        <TextInput ref={this.textInputIns} />
        <button onClick={this.focusHandler}>focus</button>
      </React.Fragment>
    );
  }
}

const TextInput = React.forwardRef((props, ref) => {

  return (
    <React.Fragment>
      <input ref={ref} type="text" />
    </React.Fragment>
  );
});

export default FocusInput;
