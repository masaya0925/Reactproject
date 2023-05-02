import axios from 'axios';
import { anecdote } from '../types';

const baseUrl = 'http://localhost:3001/anecdotes';

export const getAll = async () => {
  const response = await axios.get<anecdote[]>(baseUrl);

  return response.data;
};