/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import { Card, CardContent } from "@mui/material";

import { Blog } from "../utils/types";
import { Link } from "react-router-dom";

type Props = {
  blog: Blog;
};

export const SingleBlog: React.FC<Props> = (props: Props) => {
  const blog = props.blog;

  return (
    <Card variant="outlined" className="blogCard">
      <CardContent>
        <p>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
