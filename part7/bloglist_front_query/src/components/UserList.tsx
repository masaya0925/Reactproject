import React from "react";
import { UserType } from "../utils/types";

type PropsUser = {
  users: UserType[];
};

export const UserList = ({ users }: PropsUser) => (
  <>
    <h2>Users</h2>

    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        {users.map((user) => (
          <tbody key={user.id}>
            {/* row 1 */}
            <tr className="hover">
              <th></th>
              <a role="td" href={`/user/${user.id}`}>
                {user.name}
              </a>
              <td>{user.blogs.length}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  </>
);
