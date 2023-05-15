import axios from 'axios';
import { anecdote } from '../types';

const baseUrl = 'http://localhost:3001/anecdotes';

export const getAll = async () => {
  const response = await axios.get<anecdote[]>(baseUrl);

  return response.data;
};

export const createNew = async (content: string) => {
  const object = {content, votes: 0};
  const response = await axios.post<anecdote>(baseUrl, object);

  return response.data;
};

export const voteUpdate = async (anecdote: anecdote) => {
  const response = await axios.patch<anecdote>(
    `${baseUrl}/${anecdote.id}`, {votes: anecdote.votes}
  );

  return response.data;
};