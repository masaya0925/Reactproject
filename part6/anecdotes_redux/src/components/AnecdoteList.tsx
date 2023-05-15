import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { anecdote } from "../types";
import { setNotifications } from "../reducers/notificationReducer";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

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
  const dispatch1: ThunkDispatch<anecdote[], unknown, AnyAction> = useDispatch();
  const dispatch2: ThunkDispatch<string, unknown, AnyAction> = useDispatch();

  const filter = useSelector((state: RootState) => state.filter);
  const anecdotes = useSelector((state: RootState) => 
    state.anecdotes.filter(anecdote => 
      anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  );  

  const clickedVote = (anecdote: anecdote) => {
    void dispatch1(voteAnecdote(anecdote));
    dispatch2(setNotifications(`you voted ${anecdote.content}`, 5));
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