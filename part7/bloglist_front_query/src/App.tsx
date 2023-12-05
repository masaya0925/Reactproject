/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { SingleBlog } from "./components/Blog";
import { getAll, setToken } from "./services/blogs";
import { login } from "./services/login";
import { UserToken } from "./utils/types";
import { Togglable } from "./components/Togglable";
import { BlogForm } from "./components/BlogForm";
import { Notification } from "./components/Notification";
import { useNotice } from "./NotificationContext";
import { useQuery } from "@tanstack/react-query";
import { useLoginContext } from "./UserContext";

const App = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { setNotice } = useNotice();

  const { dispatch, user } = useLoginContext();

  useEffect(() => {
    const loggedBlogJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedBlogJSON) {
      const user: UserToken = JSON.parse(loggedBlogJSON);
      dispatch({
        type: "login",
        user: { username: user.username, name: user.name, blogs: user.blogs },
      });

      setToken(user.token);
    }
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

  const renderBlogList = () => (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged-in
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </p>
      <h2>create new</h2>
      {createBlogForm()}
      {queryBlogs.map((blog) => (
        <SingleBlog key={blog.id} blog={blog} />
      ))}
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
