import React from "react";

import { useQueryClient, useMutation, useQuery, UseQueryResult } from "react-query";
import { getAnecdotes, updateAnecdote } from "../request";
import { Anecdote } from "../types";

type Props = {
    anecdote: Anecdote,
    handleClick: () => void
};

export const AnecdoteList = () => {
  const queryClient = useQueryClient();

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData<Anecdote[]>('anecdotes');
      if(anecdotes) {
        void queryClient.setQueryData<Anecdote[]>('anecdotes',
          anecdotes.map(anecdote => 
            anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
          )
        );
      }
    }
  });

  const vote = (anecdote: Anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1});
  };

  const SingleAnecdote = ({anecdote, handleClick}: Props) => {
    return (
        <>
         <div>{anecdote.content}</div>
         <div>has {anecdote.votes}</div>
         <button onClick = {handleClick}>vote</button>
        </>
    );
  };

  const result: UseQueryResult<Anecdote[]> = useQuery('anecdotes', getAnecdotes, { retry: 1 });

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
    {anecdotes.map(anecdote => 
      <SingleAnecdote 
        key = {anecdote.id}
        anecdote = {anecdote}
        handleClick = {() => vote(anecdote)}
      />
    )}
    </>
  );
};