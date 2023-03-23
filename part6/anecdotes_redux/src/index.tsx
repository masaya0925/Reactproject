import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { anecdoteReducer } from './reducers/anecdoteReducer';

const store = createStore(anecdoteReducer);

ReactDOM.render(
  <React.StrictMode>
   <Provider store = {store}>
    <App />
   </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);