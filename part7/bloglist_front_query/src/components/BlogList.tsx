import React, { useRef } from "react";
import { Blog } from "../utils/types";
import { SingleBlog } from "./Blog";
import { BlogForm } from "./BlogForm";
import { Togglable } from "./Togglable";

type PropsBlogs = {
  blogs: Blog[];
};

export const BlogList = ({ blogs }: PropsBlogs) => {
  const blogFormRef = useRef({} as { toggleVisibility: () => void });

  const createBlogForm = () => (
    <Togglable buttonLabel="new note" ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  );

  return (
    <div>
      {createBlogForm()}
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <SingleBlog blog={blog} />
          </li>
        ))}
      </ul>
    </div>
  );
};
