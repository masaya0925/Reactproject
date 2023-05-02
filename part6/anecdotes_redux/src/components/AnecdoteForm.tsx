import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { clearNotification, setNotification } from "../reducers/notificationReducer";
import { createNew } from "../services/anecdote";

export const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event: React.FormEvent<HTMLFormElement>) => {
    void(async() => {
      event.preventDefault();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const content: string = event.currentTarget.anecdote.value;
      event.currentTarget.anecdote.value = '';
      const newAnecdote = await createNew(content);
      dispatch(createAnecdote(newAnecdote));
      dispatch(setNotification(`created: ${content}`));
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
    })();
  };
  
  return (
    <>
     <h2>create new</h2>
     <form onSubmit = {addAnecdote}>
       <div><input name = 'anecdote'/></div>
       <button type = 'submit'>create</button>
     </form>
    </>
  );
};