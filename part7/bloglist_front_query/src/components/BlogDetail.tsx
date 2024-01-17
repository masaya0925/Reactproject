/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from "react";
import axios from "axios";
import { Blog } from "../utils/types";
import { Button } from "@mui/material";
import DeletedIcon from "@mui/icons-material/Delete";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNotice } from "../NotificationContext";
import { postComment, remove, updateLikes } from "../services/blogs";

type PropsBlog = {
  blog: Blog | null | undefined;
};

export const BlogDetail = ({ blog }: PropsBlog) => {
  if (blog === null || blog === undefined) return <div />;
  const queryClient = useQueryClient();

  const { setNotice } = useNotice();

  const [comment, setComment] = useState<string>("");

  const likeBlogMutation = useMutation({
    mutationFn: updateLikes,
    onSuccess: (likedBlog) => {
      const blogs = queryClient.getQueryData<Blog[]>(["blogs"]);
      if (blogs) {
        void queryClient.setQueryData(
          ["blogs"],
          blogs.map((blog) => (blog.id !== likedBlog.id ? blog : likedBlog))
        );
      }
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: remove,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const commentBlogMutation = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const pushLikes = () => {
    try {
      likeBlogMutation.mutate({ ...blog, likes: blog.likes + 1 });
      setNotice({
        severity: "success",
        message: `Liked Blog Title: ${blog.title}, Author:${blog.author}`,
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setNotice({ severity: "error", message: err.response?.data.error });
      }
    }
  };

  const pushDelete = () => {
    try {
      if (window.confirm(`Remove blog: ${blog.title} ${blog.author}?`)) {
        deleteBlogMutation.mutate(blog);
      }
      setNotice({
        severity: "success",
        message: `"${blog.title}" ${blog.author} is deleted.`,
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setNotice({ severity: "error", message: err.response?.data.error });
      }
    }
  };

  const addComment = (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      commentBlogMutation.mutate({ id: blog.id, content: comment });
      setNotice({ severity: "success", message: `add comment :${comment}` });
      setComment("");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setNotice({ severity: "error", message: err.response?.data.error });
      }
    }
  };

  return (
    <div className="prose-xl">
      <p></p>
      <h2>{blog.title}</h2>

      <a href={""}>{blog.url}</a>
      <p>
        <button className="btn btn-outline btn-info" onClick={pushLikes}>
          {blog.likes}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="pink"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </p>
      <p> Added by {blog.user.name}</p>
      <Button
        id="deleteButton"
        variant="outlined"
        startIcon={<DeletedIcon />}
        onClick={pushDelete}
      >
        Delete
      </Button>
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <p>
          <input
            id="comment"
            placeholder="comment here..."
            className="input input-bordered input-sm w-full max-w-xs m-0.5"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <button id="submit" type="submit" className="btn btn-sm m-0.5">
            add comment
          </button>
        </p>
      </form>
      <ul>
        {blog.comment.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </div>
  );
};
