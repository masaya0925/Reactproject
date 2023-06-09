import React from 'react';

import { Toaster } from 'react-hot-toast';
import { AnecdoteForm } from './components/AnecdoteForm';
import { AnecdoteList } from './components/AnecdoteList';

const App = () => {
  return (
    <>
     <Toaster />
     <h3>Anecdote app</h3>
     <AnecdoteForm />
     <AnecdoteList />
    </>
  );
};

export default App;
