import axios from 'axios';
import { Note } from '../types';

const baseUrl = 'http://localhost:3001/notes';

export const getAll = async () => {
  const response = await axios.get<Note[]>(baseUrl);

  return response.data;
};

export const createNew = async (content: string) => {
  const object = {content, important: false};
  const response = await axios.post<Note>(baseUrl, object);

  return response.data;
};