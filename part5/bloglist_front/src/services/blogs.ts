import axios from "axios";
import { Blog } from "../utils/types";

const baseUrl = '/api/blogs';

export const getAll = async () => {
  const response = await axios.get<Blog[]>(baseUrl);
  return response.data;
};

