import axios from "axios";
import { Note } from "./types";

export const getNotes = async () => {
  const response = await axios.get<Note[]>("http://localhost:3001/notes");

  return response.data;
};
