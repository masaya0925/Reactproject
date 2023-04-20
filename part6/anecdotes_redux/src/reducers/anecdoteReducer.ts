import { createSlice } from "@reduxjs/toolkit";

const anecdotesAtStart = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ];
  
  const getId = () => Math.floor(Math.random() * 1000000);
  
  const asObject = (anecdote: string) => {
    return {
      content: anecdote,
      id: getId(),
      votes: 0
    };
  };
  
  const initialState = anecdotesAtStart.map(asObject);
  
  const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState,
    reducers: {
      createAnecdote(state, action: {type: string, payload: string}) {
        state.push({
          content: action.payload,
          id: getId(),
          votes: 0
        });
        return state.sort((a, b) => b.votes - a.votes);
      },
      vote(state, action: {type: string, payload: number}) {
        const id = action.payload;
        const voteToAnecdote = state.find(a => a.id === id);
        if(voteToAnecdote === undefined) {
          throw new Error();
        }
        const voteAnecdote = {
          ...voteToAnecdote,
          votes: voteToAnecdote.votes + 1
        };
        return state.map(anecdote => 
          anecdote.id !== id ? anecdote : voteAnecdote)
          .sort((a, b) => b.votes - a.votes
        );
      }
    }
  });

  export const { createAnecdote, vote } = anecdoteSlice.actions;
  export default anecdoteSlice.reducer;