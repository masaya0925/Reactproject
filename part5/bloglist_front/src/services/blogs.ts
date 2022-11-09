import axios from "axios";
import { Blog, NewBlog } from "../utils/types";

const baseUrl = '/api/blogs';

let token: string | null = null;

export const setToken = (newToken: string) => {
    token = `bearer ${newToken}`;
};

export const getAll = async () => {
  const response = await axios.get<Blog[]>(baseUrl);
  return response.data;
};

export const create = async (newObject: NewBlog) => {
    const config = {
      headers: { Authorization: token }
    };
    const response = await axios.post<Blog>(baseUrl, newObject, config);
    return response.data;
};