import React from "react";
import { Blog } from "../utils/types";
import { SingleBlog } from "./Blog";

type PropsBlogs = {
  blogs: Blog[];
};

export const BlogList = ({ blogs }: PropsBlogs) => (
  <div>
    {blogs.map((blog) => (
      <SingleBlog key={blog.id} blog={blog} />
    ))}
  </div>
);
