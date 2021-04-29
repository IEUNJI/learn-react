import React, { useRef, useImperativeHandle } from 'react';

const ParentInput = props => {
  const inputRef = useRef();

  const focus = () => {
    inputRef.current.focus();
  };

  return (
    <React.Fragment>
      <FocusInput ref={inputRef} />
      <button onClick={focus}>focus</button>
    </React.Fragment>
  );
};

const FocusInput = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => {

    return {
      focus: () => {
        inputRef.current.focus();
      }
    };
  });

  return (
    <React.Fragment>
      <input type="text" ref={inputRef} />
    </React.Fragment>
  );
});

export default ParentInput;
