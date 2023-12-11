import React from "react";
import { UserType } from "../utils/types";

type PropsUser = {
  user: UserType | undefined | null;
};

export const UserDetail = ({ user }: PropsUser) => {
  if (user === undefined || user === null) return <div />;
  if (user.blogs.length === 0) {
    return (
      <>
        <span style={{ padding: "3em" }}>
          <i>blogs not found...</i>
        </span>
      </>
    );
  }
  return (
    <>
      <h2>Added Blogs</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
};
