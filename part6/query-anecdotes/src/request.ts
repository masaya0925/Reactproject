import axios from "axios";
import { Anecdote, NewAnecdote } from "./types";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = async () => {
  const response = await axios.get<Anecdote[]>(baseUrl);

  return response.data;
};

export const createAnecdote = async (newAnecdote: NewAnecdote) => {
  const response = await axios.post<Anecdote>(baseUrl, newAnecdote);

  return response.data;
};

export const updateAnecdote = async (updatedAnecdote: Anecdote) => {
  const response = await axios.patch<Anecdote>(
    `${baseUrl}/${updatedAnecdote.id}`,
    {
      votes: updatedAnecdote.votes,
    }
  );

  return response.data;
};
