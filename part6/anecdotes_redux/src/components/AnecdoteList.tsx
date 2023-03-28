import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { anecdote } from "../types";

type Props = {
  anecdote: anecdote,
  handleClick: () => void
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
  const anecdotes = useSelector(state => state) as anecdote[];

  return (
    <>
      {anecdotes.map( anecdote => 
        <SingleAnecdote 
          key = {anecdote.id}
          anecdote = {anecdote}
          handleClick = {() => 
            dispatch(vote(anecdote.id)
          )}
        />
      )}
    </>
  );
};