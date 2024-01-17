import React from "react";
import "../index.css";
import { UserType } from "../utils/types";

type Props = {
  LogOut: () => void;
  user: UserType;
};

export const Menu = ({ LogOut, user }: Props) => {
  return (
    <div className=" prose-xl navbar bg-primary text-primary-content">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" href="/">
          Blogs
        </a>
        <a className="btn btn-ghost text-xl" href="/user">
          Users
        </a>
      </div>
      <div>{user.name}</div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="not-prose w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-primary rounded-box w-52"
          >
            <li>
              <a role="button" onClick={LogOut}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
