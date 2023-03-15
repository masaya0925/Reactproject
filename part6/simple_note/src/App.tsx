import React from 'react';
import { createStore } from 'redux';
import { noteReducer } from './reducers/noteReducer';

const store = createStore(noteReducer);

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'the app state is in redux data',
    important: true,
    id: 1 
  }
});

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'state change are made with actions',
    important: false,
    id: 2
  }
});

store.dispatch({
  type: 'TOGGLE_IMPORTANCE',
  data: {
    id: 2
  }
});

const App = () => {
  return (
    <>
     <ul>
      {store.getState().map(note => 
        <li key = {note.id}>
          {note.content} <strong>{note.important ? 'important': ''}</strong>
        </li>
      )}
     </ul>
    </>
  );
};

export default App;
