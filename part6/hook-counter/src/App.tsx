import React from 'react';
import { useReducer } from 'react';
import { CounterContext } from './CounterContext';
import { Button } from './Components/Button';
import { Action, State } from './types';


const counterReducer: React.Reducer<State, Action> = (state: State, action: Action) => {
  switch (action.type) {
    case 'INC':
      return {
        ...state,
        count: state.count + 1
      } 
    case 'DEC':
      return {
        ...state,
        count: state.count - 1
      }
    case 'ZERO':
      return {
        ...state,
        count: 0
      }
    default:
      return state 
  };
}

const initialState: State = { count: 0 };

const App = () => {
  const [state, counterDispatch] = useReducer(counterReducer, initialState);

  return (
    <CounterContext.Provider value = {{ state, dispatch: counterDispatch }}>
     <div>{state.count}</div>
     <div>
       <Button type = 'INC'  label = '+' />
       <Button type = 'DEC'  label = '-' />
       <Button type = 'ZERO' label = '0' />
     </div>
    </CounterContext.Provider>
  );
};

export default App;
