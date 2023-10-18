import React, { useState } from "react";
import { Card, CardContent, Button, IconButton } from "@mui/material";
import DeletedIcon from "@mui/icons-material/Delete";
import ShowDetail from "@mui/icons-material/KeyboardArrowDownSharp";
import Close from "@mui/icons-material/CloseSharp";
import Like from "@mui/icons-material/Favorite";
import { Blog } from "../utils/types";

type Props = {
  blog: Blog;
  pushLikes: (blog: Blog) => void;
  pushDelete: (blog: Blog) => void;
};

export const SingleBlog: React.FC<Props> = (props: Props) => {
  const blog = props.blog;
  const [details, setDetails] = useState<boolean>(false);

  const showWhenDetails = { display: details ? "" : "none" };

  const toggleDetails = () => {
    setDetails(!details);
  };

  const pushLikes = (): void => {
    const toUpdateBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    props.pushLikes(toUpdateBlog);
  };

  const pushDelete = (): void => {
    if (window.confirm(`Remove blog: ${blog.title} ${blog.author}?`)) {
      props.pushDelete(blog);
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
