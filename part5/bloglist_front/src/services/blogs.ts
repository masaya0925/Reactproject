import axios from "axios";
import { Blog, NewBlog } from "../utils/types";

const baseUrl = "/api/blogs";

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
    headers: { Authorization: token },
  };
  const response = await axios.post<Blog>(baseUrl, newObject, config);
  return response.data;
};

export const updateLikes = async (blog: Blog) => {
  const response = await axios.patch<Blog>(`${baseUrl}/${blog.id}`, {
    likes: blog.likes,
  });
  return response.data;
};

export const remove = async (blog: Blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete<null>(`${baseUrl}/${blog.id}`, config);
  return response.data;
};
