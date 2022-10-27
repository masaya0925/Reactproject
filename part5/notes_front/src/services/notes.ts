import axios from 'axios'
import { Note, newNote } from '../utils/types';
const baseUrl = '/api/notes'

const getAll = async () => {
  const response = await axios.get<Note[]>(baseUrl);
  return response.data;
};

const create = async (newObject: newNote) => {
  const response = await axios.post<Note>(baseUrl, newObject);
  return response.data;
};

const update = async (id: string, newObject: newNote) => {
  const response = await axios.put<Note>(`${baseUrl}/${id}`, newObject)
  return response.data;
}

const exportObj = {
  getAll,
  create,
  update
}

export default exportObj