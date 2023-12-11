import React from "react";
import { UserType } from "../utils/types";
import { Link } from "react-router-dom";

type PropsUser = {
  users: UserType[];
};

const style = {
  paddingLeft: 120,
};

export const UserList = ({ users }: PropsUser) => (
  <>
    <h2>Users</h2>
    <h3 style={style}>blogs created</h3>
    {users.map((user) => (
      <div key={user.id}>
        <p>
          <span style={{ display: "inline-block", width: "7em" }}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
          </span>
          {user.blogs.length}
        </p>
      </div>
    ))}
  </>
);
