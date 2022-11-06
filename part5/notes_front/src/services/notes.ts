import axios from 'axios';
import { Note, newNote } from '../utils/types';

const baseUrl = '/api/notes';

let token: string | null = null;

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get<Note[]>(baseUrl);
  return response.data;
};

const create = async (newObject: newNote) => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.post<Note>(baseUrl, newObject, config);
  return response.data;
};

const update = async (id: string, newObject: newNote) => {
  const response = await axios.put<Note>(`${baseUrl}/${id}`, newObject);
  return response.data;
};

const exportObj = {
  getAll,
  create,
  update,
  setToken
};

export default exportObj;