import React, { ReactNode, useState, useImperativeHandle } from "react";

type Props = {
  buttonLabel: string,
  children: ReactNode
};

type Handler = {
  toggleVisibility: () => void
};

export const Togglable = React.forwardRef<Handler, React.PropsWithChildren<Props>>((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none': '' };
  const showWhenVisible = { display: visible ? '': 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    };
  });

  return (
    <div>
      <div style = {hideWhenVisible}>
        <button onClick = {toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style = {showWhenVisible}>
        {props.children}
        <button onClick = {toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable';