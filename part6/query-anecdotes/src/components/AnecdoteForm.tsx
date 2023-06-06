import React from "react";

export const AnecdoteForm = () => {

  const onCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
 // const content: string = event.currentTarget.anecdote.value;
    event.currentTarget.anecdote.value = '';
    console.log('new anecdote');
  }

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