/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import { Blog } from "../utils/types";

type Props = {
  blog: Blog;
};

export const SingleBlog: React.FC<Props> = (props: Props) => {
  const blog = props.blog;

  return (
    <div className="card h-90 bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{blog.title}</h2>
        <p>{blog.author}</p>
        <div className="card-actions justify-end">
          <a
            role="button"
            className="btn btn-primary"
            href={`/blogs/${blog.id}`}
          >
            Show Detail
          </a>
        </div>
      </div>
    </div>
  );
};
