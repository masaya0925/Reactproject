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
        <div className="mockup-browser border border-base-300">
          <div className="mockup-browser-toolbar">
            <div className="input border border-base-300"></div>
          </div>
          <div className="flex justify-center px-4 py-16 border-t border-base-300">
            Blogs not found...
          </div>
        </div>
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
