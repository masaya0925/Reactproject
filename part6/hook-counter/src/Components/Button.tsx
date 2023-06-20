import React, { useContext } from "react";
import { CounterContext } from "../CounterContext";

type ButtonProps = {
    type: string,
    label: string
  };
  
export const Button = ({ type, label }: ButtonProps) => {
  const { dispatch } = useContext(CounterContext);
    return (
      <button onClick = {() => dispatch({ type })}>
        {label}
      </button>
    )
};