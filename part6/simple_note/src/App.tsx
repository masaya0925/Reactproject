import React, { useEffect } from 'react';
import { NewNote } from './components/newNote';
import { Notes } from './components/Notes';
import { VisibilityFilter } from './components/VisibilityFilter';
import { initializeNotes } from './reducers/noteReducer';
import { useDispatch } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { Note } from './types';

const App = () => {
  const dispatch: ThunkDispatch<Note[], unknown, AnyAction> = useDispatch();

  useEffect(() => {
   void dispatch(initializeNotes());
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
