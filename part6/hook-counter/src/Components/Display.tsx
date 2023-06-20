import React, { useContext } from "react";
import { CounterContext } from "../CounterContext";

export const Display = () => {
  const counter = useContext(CounterContext);
  return <>{counter}</>
}