import React from 'react';
import { NewNote } from './components/newNote';
import { Notes } from './components/Notes';
import { VisibilityFilter } from './components/VisibilityFilter';

const App = () => {
  return (
    <>
      <NewNote/>
      <VisibilityFilter/>
      <Notes/>
    </>
  );
};

export default App;
