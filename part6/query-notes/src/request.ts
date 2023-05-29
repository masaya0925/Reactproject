import axios from "axios";
import { Note, NewNote } from "./types";

const baseUrl = "http://localhost:3001/notes";

export const getNotes = async () => {
  const response = await axios.get<Note[]>(baseUrl);

  return response.data;
};

export const createNote = async (newNote: NewNote) => {
  const response = await axios.post<NewNote>(baseUrl, newNote);

  return response.data;
};

export const updateNote = async (updatedNote: Note) => {
  const response = await axios.put<Note>(
    `${baseUrl}/${updatedNote.id}`,
    updatedNote
  );

  return response.data;
};
