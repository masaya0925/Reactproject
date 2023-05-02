import React, { useEffect } from 'react';
import { NewNote } from './components/newNote';
import { Notes } from './components/Notes';
import { VisibilityFilter } from './components/VisibilityFilter';
import { getAll } from './services/notes';
import { setNotes } from './reducers/noteReducer';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    void getAll().then(notes => 
      dispatch(setNotes(notes)));
  }, []);

  return (
    <>
      <NewNote/>
      <VisibilityFilter/>
      <Notes/>
    </>
  );
};

export default App;
