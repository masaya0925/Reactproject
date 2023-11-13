import React, { ReactNode, useImperativeHandle, useState } from "react";

type Props = {
  buttonLabel: string,
  children: ReactNode
};

type Handler = {
    toggleVisibility: () => void
};

export const Togglable = React.forwardRef<Handler, React.PropsWithChildren<Props>>((props, ref) => {
  const [visible, setVisible] = useState<boolean>(false);

  const showWhenVisible = { display: visible ? '': 'none'};
  const hideWhenVisible = { display: visible ? 'none': ''};

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return{
        toggleVisibility
    };
  });

  return (
    <>
     <div style = {hideWhenVisible}>
      <button onClick = {toggleVisibility}>{props.buttonLabel}</button>
     </div>
     <div style = {showWhenVisible}>
      {props.children}
      <button onClick = {toggleVisibility}>cancel</button>
     </div>
    </>
  );
});

Togglable.displayName = 'Togglable';