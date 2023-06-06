import React from "react";
import toast  from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { createAnecdote } from "../request";
import { Anecdote } from "../types";

export const AnecdoteForm = () => {
  const queryClient = useQueryClient();

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
      toast.error('The content must be at least 5 words.');
    } else {
      newAnecdoteMutation.mutate({ content, votes: 0});
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