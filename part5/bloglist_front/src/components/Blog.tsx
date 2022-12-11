import React, {useState} from "react";
import { Card, CardContent} from "@mui/material";
import { Blog } from "../utils/types";

type Props = {
    blog: Blog,
    pushLikes: (blog: Blog) => void
};

export const SingleBlog: React.FC<Props> = ( props: Props) => {
  const blog = props.blog;
  const [details, setDetails] = useState<boolean>(false);

  const showWhenDetails = {display: details ? '': 'none'};

  const toggleDetails = () => {
    setDetails(!details);
  };

  const pushLikes = (): void => {
    const toUpdateBlog = ({ 
      ...blog, 
      likes: blog.likes + 1
    });
    props.pushLikes(toUpdateBlog);
  };

  return (
      <Card variant="outlined">
        <CardContent>
            <p>{blog.title} {blog.author}<button onClick = {toggleDetails}>{details ? 'hide': 'show'}</button></p>
          <div style = {showWhenDetails}>
            <p>{blog.url}</p> 
            <p>{blog.likes}<button onClick = {pushLikes}>likes</button></p>
            <p>{blog.user.name}</p>
          </div>
        </CardContent>
      </Card>
  );
};
