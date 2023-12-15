/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { getAll, setToken } from "./services/blogs";
import { login } from "./services/login";
import { UserToken, UserType } from "./utils/types";
import { Notification } from "./components/Notification";
import { useNotice } from "./NotificationContext";
import { useQuery } from "@tanstack/react-query";
import { useLoginContext } from "./UserContext";
import { Route, Routes, useMatch } from "react-router-dom";
import { UserList } from "./components/UserList";
import { getAllUser } from "./services/users";
import { BlogList } from "./components/BlogList";
import { BlogForm } from "./components/BlogForm";
import { Togglable } from "./components/Togglable";
import { UserDetail } from "./components/User";
import { BlogDetail } from "./components/BlogDetail";
import { Menu } from "./components/Menu";

const App = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [users, setUsers] = useState<UserType[]>([]);

  const { setNotice } = useNotice();

  const { dispatch, user } = useLoginContext();

  console.log("users: ", users);

  useEffect(() => {
    void (async () => {
      const loggedBlogJSON = window.localStorage.getItem("loggedBlogAppUser");
      if (loggedBlogJSON) {
        const user: UserToken = JSON.parse(loggedBlogJSON);
        dispatch({
          type: "login",
          user: {
            id: user.id,
            username: user.username,
            name: user.name,
            blogs: user.blogs,
          },
        });
        const allUsers = await getAllUser();
        setUsers(allUsers);
        setToken(user.token);
      }
    })();
  }, []);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    void (async () => {
      event.preventDefault();
      try {
        const user = await login({ username, password });

        window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

        setToken(user.token);
        dispatch({
          type: "login",
          user: {
            id: user.id,
            username: user.username,
            name: user.name,
            blogs: user.blogs,
          },
        });
        setUsername("");
        setPassword("");
        setNotice({
          severity: "success",
          message: `Welcome ${user.username}.`,
        });
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setNotice({ severity: "error", message: err.response?.data.error });
        }
      }
    })();
  };

  const handleLogout = () => {
    dispatch({ type: "logout", user: user });
    window.localStorage.removeItem("loggedBlogAppUser");
    setNotice({ severity: "success", message: "Logged out." });
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  );

  const blogFormRef = useRef({} as { toggleVisibility: () => void });

  const createBlogForm = () => (
    <Togglable buttonLabel="new note" ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  );

  const renderLoginForm = () => (
    <div>
      <h2>log in to application</h2>
      {loginForm()}
    </div>
  );
  const userMatch = useMatch("/user/:id");

  const blogMatch = useMatch("/blogs/:id");

  const userDetail = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null;

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: getAll,
  });

  if (result.isLoading) {
    return <>loading now...</>;
  }

  if (result.data === undefined) {
    return <>undefined data...</>;
  }

  const queryBlogs = result.data.sort((a, b) => b.likes - a.likes);

  const blogDetail = blogMatch
    ? queryBlogs.find((blog) => blog.id === blogMatch.params.id)
    : null;

  const renderBlogList = () => (
    <div>
      <p>
        <Menu /> {user.name} logged-in
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </p>
      <h2>blogs</h2>
      {createBlogForm()}
      <Routes>
        <Route path="/blogs/:id" element={<BlogDetail blog={blogDetail} />} />
        <Route path="/user/:id" element={<UserDetail user={userDetail} />} />
        <Route path="/user" element={<UserList users={users} />} />
        <Route path="/" element={<BlogList blogs={queryBlogs} />} />
      </Routes>
    </div>
  );

  return (
    <>
      <Notification />
      <div>{user.name === "" ? renderLoginForm() : renderBlogList()}</div>
    </>
  );
};

export default App;
