/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from "react";
import { Card, CardContent, Button, IconButton } from "@mui/material";
import DeletedIcon from "@mui/icons-material/Delete";
import ShowDetail from "@mui/icons-material/KeyboardArrowDownSharp";
import Close from "@mui/icons-material/CloseSharp";
import Like from "@mui/icons-material/Favorite";
import { Blog } from "../utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { remove, updateLikes } from "../services/blogs";
import { useNotice } from "../NotificationContext";
import axios from "axios";

type Props = {
  blog: Blog;
};

export const SingleBlog: React.FC<Props> = (props: Props) => {
  const blog = props.blog;
  const [details, setDetails] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { setNotice } = useNotice();

  const showWhenDetails = { display: details ? "" : "none" };

  const toggleDetails = () => {
    setDetails(!details);
  };

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
    <Card variant="outlined" className="blogCard">
      <CardContent>
        <p>
          {blog.title} {blog.author}
          <IconButton id="detailButton" color="info" onClick={toggleDetails}>
            {details ? <Close /> : <ShowDetail />}
          </IconButton>
        </p>
        <div style={showWhenDetails} className="details">
          <p>{blog.url}</p>
          <p>
            likes: {blog.likes}
            <IconButton
              id="likeButton"
              style={{ color: "pink" }}
              onClick={pushLikes}
            >
              <Like />
            </IconButton>
          </p>
          <p>{blog.user.name}</p>
          <Button
            id="deleteButton"
            variant="outlined"
            startIcon={<DeletedIcon />}
            onClick={pushDelete}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
