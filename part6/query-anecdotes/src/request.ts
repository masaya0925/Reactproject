import axios from "axios";
import { Anecdote } from "./types";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = async () => {
  const response = await axios.get<Anecdote[]>(baseUrl);

  return response.data;
};
