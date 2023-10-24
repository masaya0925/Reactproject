import {
  AnyAction,
  createSlice,
  PayloadAction,
  ThunkAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { Blog, NewBlog, RootState } from "../utils/types";
import { create, getAll, remove, updateLikes } from "../services/blogs";
import { setNotifications } from "./notificationReducer";
import axios from "axios";

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
    like: (state, action: PayloadAction<Blog>) => {
      const liked = action.payload;
      const newState = state.map((blog) =>
        blog.id !== liked.id ? blog : liked
      );
      return newState.sort((a, b) => b.likes - a.likes);
    },
    deleteBlog: (state, action: PayloadAction<Blog>) => {
      const deleteBlog = action.payload;
      return state.filter((blog) => blog.id !== deleteBlog.id);
    },
  },
});

export const { setBlogs, addBlog, like, deleteBlog } = blogSlice.actions;

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
  newBlog: NewBlog,
  nDispatch: ThunkDispatch<RootState, unknown, AnyAction>
): ThunkAction<Promise<void>, Blog[], unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      const blog = await create(newBlog);
      dispatch(addBlog(blog));
      nDispatch(
        setNotifications({
          severity: "success",
          message: `Added ${newBlog.title} author: ${newBlog.author}`,
        })
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error;
        if (axiosError.response) {
          nDispatch(
            setNotifications({
              severity: "error",
              message: `${axiosError.response.data.error}`,
            })
          );
        }
      }
    }
  };
};

export const likedBlog = (
  blog: Blog,
  nDispatch: ThunkDispatch<RootState, unknown, AnyAction>
): ThunkAction<Promise<void>, Blog[], unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      const likeBlog = {
        ...blog,
        likes: blog.likes + 1,
      };
      const likeToBlog = await updateLikes(likeBlog);
      dispatch(like(likeToBlog));
      nDispatch(
        setNotifications({
          severity: "success",
          message: `Liked ${blog.title} author: ${blog.author}`,
        })
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error;
        if (axiosError.response) {
          nDispatch(
            setNotifications({
              severity: "error",
              message: `${axiosError.response.data.error}`,
            })
          );
        }
      }
    }
  };
};

export const removeBlog = (
  blog: Blog,
  nDispatch: ThunkDispatch<RootState, unknown, AnyAction>
): ThunkAction<Promise<void>, Blog[], unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      await remove(blog);
      dispatch(deleteBlog(blog));
      nDispatch(
        setNotifications({
          severity: "success",
          message: "Successfully deleted!",
        })
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error;
        if (axiosError.response) {
          nDispatch(
            setNotifications({
              severity: "error",
              message: `${axiosError.response.data.error}`,
            })
          );
        }
      }
    }
  };
};
export default blogSlice.reducer;
