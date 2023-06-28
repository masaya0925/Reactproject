import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { createAnecdote } from "../request";
import { useNotification } from "../NotificationContext";
import { Anecdote } from "../types";

export const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const { dispatch } = useNotification();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData<Anecdote[]>('anecdotes');
      if(anecdotes) {
        void queryClient.setQueryData('anecdotes', [...anecdotes, newAnecdote]);
      }
    }
  });

  const onCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content: string = event.currentTarget.anecdote.value;
    event.currentTarget.anecdote.value = '';
    if(content.length < 5) {
      dispatch({type: 'create', payload: 'too short anecdote, must have length 5 or more'});
    } else {
      newAnecdoteMutation.mutate({ content, votes: 0});
      dispatch({type: 'create', payload: `created anecdote: ${content}`});
    }
  };

  return (
    <>
     <h3>create new</h3>
     <form onSubmit = {onCreate}>
      <input name = 'anecdote'/>
      <button type = 'submit'>create</button>
     </form>
    </>
  );
};