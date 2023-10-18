import {
  AnyAction,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import { Blog, NewBlog } from "../utils/types";
import { create, getAll } from "../services/blogs";

const initialState: Blog[] = [];

export const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs: (_state, action: PayloadAction<Blog[]>) => {
      return action.payload;
    },
    addBlog: (state, action: PayloadAction<Blog>) => {
      state.push(action.payload);
    },
  },
});

export const { setBlogs, addBlog } = blogSlice.actions;

export const getBlogs = (): ThunkAction<
  Promise<void>,
  Blog[],
  unknown,
  AnyAction
> => {
  return async (dispatch) => {
    const blogs = await getAll();
    blogs.sort((a, b) => b.likes - a.likes);
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (
  newBlog: NewBlog
): ThunkAction<Promise<void>, Blog[], unknown, AnyAction> => {
  return async (dispatch) => {
    const blog = await create(newBlog);
    dispatch(addBlog(blog));
  };
};

export default blogSlice.reducer;
