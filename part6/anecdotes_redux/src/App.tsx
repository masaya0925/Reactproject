import React, { useEffect } from 'react';
import { AnecdoteForm } from './components/AnecdoteForm';
import { AnecdoteList } from './components/AnecdoteList';
import { Filter } from './components/Filter';
import { Notification } from './components/Notification';
import { useDispatch } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { initializeAnecdotes } from './reducers/anecdoteReducer';
import { anecdote } from './types';


const App = () => {
  const dispatch: ThunkDispatch<anecdote[], unknown, AnyAction> = useDispatch();

  useEffect(() => {
    void dispatch(initializeAnecdotes());
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;