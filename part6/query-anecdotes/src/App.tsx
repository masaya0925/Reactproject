import React from 'react';

import { Toaster } from 'react-hot-toast';
import { AnecdoteForm } from './components/AnecdoteForm';
import { Notification } from './components/Notification';
import { Anecdote } from './types';
import { UseQueryResult, useQuery } from 'react-query';
import { getAnecdotes } from './request';

const App = () => {

  const handleVote = (anecdote: Anecdote) => {
    console.log('vote');
  };

  const result: UseQueryResult<Anecdote[]> = useQuery(
    'anecdotes', getAnecdotes, { retry: 1 }
  );

  console.log(result);

  if(result.isLoading) {
    return <>Loading...</>
  }

  if(result.isError) {
    return <>anecdote service not available due to problem in server</>
  }

  if(result.data === undefined) {
    return <>undefined data</>
  }

  const anecdotes: Anecdote[] = result.data;

  return (
    <>
     <Toaster />
     <h3>Anecdote app</h3>

     <Notification />
     <AnecdoteForm />

     {anecdotes.map(anecdote => 
      <div key = {anecdote.id}>
        <>
        {anecdote.content}
        </>
        <>
         has {anecdote.votes}
         <button onClick = {() => handleVote(anecdote)}>vote</button>
        </>
      </div>
      )}
    </>
  );
};

export default App;
