import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { anecdote } from "../types";
import { clearNotification, setNotification } from "../reducers/notificationReducer";

type Props = {
  anecdote: anecdote,
  handleClick: () => void
};

type RootState = {
  filter: string,
  anecdotes: anecdote[]
};

const SingleAnecdote = ({anecdote, handleClick}: Props) => {
  return (
    <>
     <div>{anecdote.content}</div>
     <div>has {anecdote.votes}
     <button onClick = {handleClick}>vote</button>
     </div>
    </>
  );
};

export const AnecdoteList = () => {
  const dispatch = useDispatch();

  const filter = useSelector((state: RootState) => state.filter);
  const anecdotes = useSelector((state: RootState) => 
    state.anecdotes.filter(anecdote => 
      anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  );  

  const clickedVote = (anecdote: anecdote) => {
    dispatch(vote(anecdote.id));
    dispatch(setNotification(`you voted ${anecdote.content}`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  return (
    <>
      {anecdotes.map( anecdote => 
        <SingleAnecdote 
          key = {anecdote.id}
          anecdote = {anecdote}
          handleClick = {() => 
            clickedVote(anecdote)
          }
        />
      )}
    </>
  );
};