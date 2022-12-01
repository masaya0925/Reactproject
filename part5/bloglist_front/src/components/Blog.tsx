import React, {useState} from "react";
import { Card, CardContent} from "@mui/material";
import { Blog } from "../utils/types";

type Props = {
    blog: Blog
};

export const SingleBlog: React.FC<Props> = ({ blog }: Props) => {
  const [details, setDetails] = useState<boolean>(false);

  const hideWhenDetails = {display: details ? 'none': ''};
  const showWhenDetails = {display: details ? '': 'none'};

  const toggleDetails = () => {
    setDetails(!details);
  };

  return (
      <Card variant="outlined">
        <CardContent>
          <div style = {hideWhenDetails}>
            <p>{blog.title} {blog.author}<button onClick = {toggleDetails}>view</button></p>
          </div>
          <div style = {showWhenDetails}>
            <p>{blog.title} <button onClick = {toggleDetails}>hide</button></p>
            <p>{blog.url}</p> 
            <p>{blog.likes} <button>likes</button></p>
            <p>{blog.author}</p>
          </div>
        </CardContent>
      </Card>
  );
};
