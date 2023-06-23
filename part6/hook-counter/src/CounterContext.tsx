import React, { createContext, useContext, useReducer } from "react";
import { Action, State } from "./types";

const counterReducer: React.Reducer<State, Action> = (
  state: State,
  action: Action
) => {
  switch (action.type) {
    case 'INC':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'DEC':
      return {
        ...state,
        count: state.count - 1,
      };
    case 'ZERO':
      return {
        ...state,
        count: 0,
      };
    default:
      return state;
  }
};

const initialState = { count: 0 };

const useCounterReducer = () => {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return { state, dispatch };
};

const defaultValue = {
  state: initialState,
  dispatch: (() => {}) as React.Dispatch<Action> 
};

const { state, dispatch } = defaultValue;

const CounterValue = createContext(state);

const CounterDispatch = createContext(dispatch);

export const useCounterValue = () => useContext(CounterValue);

export const useCounterDispatch = () => useContext(CounterDispatch);

type Props = {
  children: React.ReactNode;
};

export const CounterContextProvider = (props: Props) => {

  const { state, dispatch } = useCounterReducer();

  return (
    <CounterValue.Provider value = { state }> 
     <CounterDispatch.Provider value = { dispatch }>
        {props.children}
      </CounterDispatch.Provider>
    </CounterValue.Provider>
  );
};
