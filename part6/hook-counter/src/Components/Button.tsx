import React from "react";
import { useCounterDispatch } from "../CounterContext";

type ButtonProps = {
    type: string,
    label: string
  };
  
export const Button = ({ type, label }: ButtonProps) => {
  const  dispatch  = useCounterDispatch();
    return (
      <button onClick = {() => dispatch({ type })}>
        {label}
      </button>
    )
};