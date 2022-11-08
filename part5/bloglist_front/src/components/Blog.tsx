import React from "react";
import { Blog } from "../utils/types";

type Props = {
    blog: Blog
};

export const SingleBlog: React.FC<Props> = ({ blog }: Props) => (
  <div>
    {blog.title} {blog.author}
  </div>
);
