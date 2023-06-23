import React from "react";
import { useCounterValue } from "../CounterContext";

export const Display = () => {
  const counter = useCounterValue();
  return <>{counter.count}</>
}