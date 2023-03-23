import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { anecdote } from './types';
import { vote, createAnecdote } from './reducers/anecdoteReducer';


const App = () => {
  const anecdotes = useSelector(state => state) as anecdote[];
  const dispatch = useDispatch();

  const addAnecdote = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const content: string = event.currentTarget.anecdote.value;
    event.currentTarget.anecdote.value = '';
    dispatch(createAnecdote(content));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit = {addAnecdote}>
        <div><input name = 'anecdote'/></div>
        <button type = 'submit'>create</button>
      </form>
    </div>
  );
};

export default App;