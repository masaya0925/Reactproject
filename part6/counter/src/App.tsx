import React from 'react';
import ReactDOM  from 'react-dom';
import { createStore } from 'redux';

const counterReducer = (state = 0, action: { type: unknown; }) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'ZERO':
      return 0;
    default:
      return state;
  }
};

const store = createStore(counterReducer);

store.subscribe(() => {
  const storeNow = store.getState();
  console.log(storeNow);
});

 const App = () => {
  return (
    <>
     <>{store.getState()}</>
     <button onClick = {() => store.dispatch({ type: 'INCREMENT'})}>
      plus
     </button>
     <button onClick = {() => store.dispatch({ type: 'DECREMENT'})}>
      minus
     </button>
     <button onClick = {() => store.dispatch({ type: 'ZERO'})}>
      zero
     </button>
    </>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();
store.subscribe(renderApp);

export default App;