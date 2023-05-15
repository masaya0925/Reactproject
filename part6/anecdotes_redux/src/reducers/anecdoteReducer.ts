import { AnyAction, ThunkAction, createSlice } from "@reduxjs/toolkit";
import { anecdote } from "../types";
import { createNew, getAll, voteUpdate } from "../services/anecdote";

  //const getId = () => Math.floor(Math.random() * 1000000);
  
  const initialState: anecdote[] = [];
  
  const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState,
    reducers: {
      vote(state, action: {type: string, payload: anecdote}) {
        const voted: anecdote = action.payload;
        const newState = state.map(anecdote => anecdote.id !== voted.id ? anecdote : voted);
        return newState.sort((a, b) => b.votes - a.votes);
      },
      setAnecdotes(_state, action: {type: string, payload: anecdote[]}) {
        return action.payload;
      },
      appendAnecdote(state, action: {type: string, payload: anecdote}) {
        state.push(action.payload);
      }
    }
  });

  export const { vote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions;

  export const initializeAnecdotes = (): ThunkAction<Promise<void>, anecdote[], unknown, AnyAction> => {
    return async (dispatch) => {
      const anecdotes = await getAll();
      dispatch(setAnecdotes(anecdotes));
    };
  };

  export const createAnecdote = (content: string): ThunkAction<Promise<void>, anecdote[], unknown, AnyAction> => {
    return async (dispatch) => {
      const newAnecdote = await createNew(content);
      dispatch(appendAnecdote(newAnecdote));
    };
  };

  export const voteAnecdote = (anecdote: anecdote): ThunkAction<Promise<void>, anecdote[], unknown, AnyAction> => {
    return async (dispatch) => {
      const voteAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
      };
      const voteToAnecdote = await voteUpdate(voteAnecdote);
      dispatch(vote(voteToAnecdote));
    };
  };

  export default anecdoteSlice.reducer;