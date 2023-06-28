import React from 'react';

import { Notification } from './components/Notification';
import { AnecdoteForm } from './components/AnecdoteForm';
import { AnecdoteList } from './components/AnecdoteList';

const App = () => {
  return (
    <>
     <h3>Anecdote app</h3>
     <Notification />
     <AnecdoteForm />
     <AnecdoteList />
    </>
  );
};

export default App;
