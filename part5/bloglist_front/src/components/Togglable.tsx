import React, { ReactNode, useState } from "react";

type Props = {
  buttonLabel: string,
  children: ReactNode
};

export const Togglable: React.FC<Props> = (props) => {
  const [visible, setVisible] = useState<boolean>(false);

  const showWhenVisible = { display: visible ? '': 'none'};
  const hideWhenVisible = { display: visible ? 'none': ''};

  const toggleVisibility = () => {
    setVisible(!visible);
  };

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
};