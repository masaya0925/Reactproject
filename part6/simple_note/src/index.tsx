import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { noteReducer } from './reducers/noteReducer';
import { filterReducer } from './reducers/filterReducer';

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
});

const store = createStore(reducer);

console.log(store.getState());

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);