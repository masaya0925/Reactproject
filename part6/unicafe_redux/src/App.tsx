import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { counterReducer } from "./reducer";

const store = createStore(counterReducer);

const App = () => {
  return (
    <>
     <p>
        <button onClick = {() => store.dispatch({ type: 'GOOD'})}>good</button>
        <button onClick = {() => store.dispatch({ type: 'OK'})}>ok</button>
        <button onClick = {() => store.dispatch({ type: 'BAD'})}>bad</button>
        <button onClick = {() => store.dispatch({ type: 'ZERO'})}>reset stats</button>
     </p>
     <p>good: {store.getState().good}</p>
     <p>ok: {store.getState().ok}</p>
     <p>bad: {store.getState().bad}</p>
    </>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();
store.subscribe(renderApp);

export default App;