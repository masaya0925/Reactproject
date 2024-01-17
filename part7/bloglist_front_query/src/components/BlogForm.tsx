import React, { useRef, useState } from "react";
import { Blog } from "../utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { create } from "../services/blogs";
import { useNotice } from "../NotificationContext";
import axios from "axios";

export const BlogForm: React.FC = () => {
  const queryClient = useQueryClient();

  const { setNotice } = useNotice();

  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  const blogFormRef = useRef({} as { toggleVisibility: () => void });

  const addBlogMutation = useMutation({
    mutationFn: create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData<Blog[]>(["blogs"]);
      if (blogs) {
        void queryClient.setQueryData(["blogs"], [...blogs, newBlog]);
      }
      blogFormRef.current.toggleVisibility();
    },
  });

  const addBlog = (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      addBlogMutation.mutate({
        title: title,
        url: url,
        author: author,
        likes: 0,
      });
      setNotice({
        severity: "success",
        message: `A new blog "${title}" by ${author} added.`,
      });
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        setNotice({ severity: "error", message: err.response?.data.error });
      }
    }
  };

  return (
    <>
      <form onSubmit={addBlog}>
        <div>
          <input
            id="title"
            placeholder="title"
            className="input input-bordered input-sm w-full max-w-xs m-0.5"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <input
            id="author"
            placeholder="author"
            className="input input-bordered input-sm w-full max-w-xs m-0.5"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <input
            id="url"
            placeholder="url"
            className="input input-bordered input-sm w-full max-w-xs m-0.5"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="submit" type="submit" className="btn btn-sm m-0.5">
          create
        </button>
      </form>
    </>
  );
};
