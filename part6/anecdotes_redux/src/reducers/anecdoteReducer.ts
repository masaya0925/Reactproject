import { AnyAction, ThunkAction, createSlice } from "@reduxjs/toolkit";
import { anecdote } from "../types";
import { getAll } from "../services/anecdote";

  //const getId = () => Math.floor(Math.random() * 1000000);
  
  const initialState: anecdote[] = [];
  
  const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState,
    reducers: {
      createAnecdote(state, action: {type: string, payload: anecdote}) {
        state.push(action.payload);
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
      },
      setAnecdotes(_state, action: {type: string, payload: anecdote[]}) {
        return action.payload;
      }
    }
  });

  export const { createAnecdote, vote, setAnecdotes } = anecdoteSlice.actions;

  export const initializeAnecdotes = (): ThunkAction<Promise<void>, anecdote[], unknown, AnyAction> => {
    return async (dispatch) => {
      const anecdotes = await getAll();
      dispatch(setAnecdotes(anecdotes));
    };
  };

  export default anecdoteSlice.reducer;