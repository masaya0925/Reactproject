import { createContext } from "react";
import { Action, State } from "./types";

export const CounterContext = createContext(
  {} as {
    state: State;
    dispatch: React.Dispatch<Action>;
  }
);
