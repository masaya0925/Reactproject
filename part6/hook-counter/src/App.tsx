import React from 'react';
import { useReducer } from 'react';


const counterReducer = (state = 0, action: { type: unknown }) => {
  switch (action.type) {
    case 'INC':
      return state + 1
    case 'DEC':
      return state - 1
    case 'ZERO':
      return 0
    default:
      return state 
  };
}

const App = () => {
  const [counter, counterDispatch] = useReducer(counterReducer, 0);

  return (
    <>
     <div>{counter}</div>
     <div>
       <button onClick = {() => counterDispatch({ type: 'INC' })}>+</button>
       <button onClick = {() => counterDispatch({ type: 'DEC' })}>-</button>
       <button onClick = {() => counterDispatch({ type: 'ZERO' })}>0</button>
     </div>
    </>
  );
};

export default App;
