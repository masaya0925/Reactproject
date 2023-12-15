/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import axios from "axios";
import { Blog } from "../utils/types";
import { Button, IconButton } from "@mui/material";
import Like from "@mui/icons-material/Favorite";
import DeletedIcon from "@mui/icons-material/Delete";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNotice } from "../NotificationContext";
import { remove, updateLikes } from "../services/blogs";

type PropsBlog = {
  blog: Blog | null | undefined;
};

export const BlogDetail = ({ blog }: PropsBlog) => {
  if (blog === null || blog === undefined) return <div />;
  const queryClient = useQueryClient();

  const { setNotice } = useNotice();

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

  return (
    <>
      <h1>{blog.title}</h1>

      <a href={`${blog.url}`} />
      <p>
        {blog.likes} likes
        <IconButton
          id="likeButton"
          style={{ color: "pink" }}
          onClick={pushLikes}
        >
          <Like />
        </IconButton>
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
    </>
  );
};
