import React, { useState, useEffect, useRef } from "react";

import { SingleBlog } from "./components/Blog";
import {
  getAll,
  setToken,
  create,
  updateLikes,
  remove,
} from "./services/blogs";
import { login } from "./services/login";
import { Blog, NewBlog, UserToken } from "./utils/types";
import { Togglable } from "./components/Togglable";
import { BlogForm } from "./components/BlogForm";
import { setNotifications } from "./reducers/notificationReducer";
import { Notification, RootState } from "./components/Notification";
import { useDispatch } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

const App = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState<UserToken | null>(null);

  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();

  useEffect(() => {
    void (async () => {
      try {
        const blogs = await getAll();
        blogs.sort((a, b) => b.likes - a.likes);
        setBlogs(blogs);
      } catch (e) {
        dispatch(
          setNotifications({
            severity: "error",
            message: "Unable to retrieve Blogs",
          })
        );
      }
    })();
  }, []);

  useEffect(() => {
    const loggedBlogJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedBlogJSON) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const user: UserToken = JSON.parse(loggedBlogJSON);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    void (async () => {
      event.preventDefault();
      try {
        const user = await login({ username, password });

        window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

        setToken(user.token);
        setUser(user);
        setUsername("");
        setPassword("");
        dispatch(
          setNotifications({
            severity: "success",
            message: `Welcome ${user.username}`,
          })
        );
      } catch (err) {
        console.log(err);
        dispatch(
          setNotifications({ severity: "error", message: "Login Failed" })
        );
      }
    })();
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(setNotifications({ severity: "success", message: "user logout" }));
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

  const addBlog = (blogObject: NewBlog) => {
    void (async () => {
      try {
        const returnedBlog = await create(blogObject);
        setBlogs(blogs.concat(returnedBlog).sort((a, b) => b.likes - a.likes));
        blogFormRef.current.toggleVisibility();
        dispatch(
          setNotifications({
            severity: "success",
            message: `A new blog "${blogObject.title}" by ${blogObject.author} added.`,
          })
        );
        console.log();
      } catch (err) {
        console.log(err);
        dispatch(
          setNotifications({ severity: "error", message: "Failed added Blog" })
        );
      }
    })();
  };

  const likeBlog = (targetBlog: Blog) => {
    void (async () => {
      try {
        await updateLikes(targetBlog);
        setBlogs(
          blogs
            .map((blog) => (blog.id !== targetBlog.id ? blog : targetBlog))
            .sort((a, b) => b.likes - a.likes)
        );
        dispatch(
          setNotifications({
            severity: "success",
            message: `Liked Blog Title: ${targetBlog.title}, Author:${targetBlog.author}`,
          })
        );
      } catch (err) {
        console.log(err);
        dispatch(
          setNotifications({ severity: "error", message: "Failed Liked Blog" })
        );
      }
    })();
  };

  const deleteBlog = (targetBlog: Blog) => {
    void (async () => {
      try {
        await remove(targetBlog);
        setBlogs(
          blogs
            .filter((blog) => blog.id !== targetBlog.id)
            .sort((a, b) => b.likes - a.likes)
        );
        dispatch(
          setNotifications({
            severity: "success",
            message: `"${targetBlog.title}" ${targetBlog.author} is deleted.`,
          })
        );
      } catch (err) {
        dispatch(
          setNotifications({
            severity: "error",
            message: "Failed Deleted Blog",
          })
        );
      }
    })();
  };

  const createBlogForm = () => (
    <Togglable buttonLabel="new note" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  const renderLoginForm = () => (
    <div>
      <h2>log in to application</h2>
      {loginForm()}
    </div>
  );

  const renderBlogList = () => (
    <div>
      <h2>blogs</h2>
      <p>
        {user?.name} logged-in
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </p>
      <h2>create new</h2>
      {createBlogForm()}
      {blogs.map((blog) => (
        <SingleBlog
          key={blog.id}
          blog={blog}
          pushLikes={likeBlog}
          pushDelete={deleteBlog}
        />
      ))}
    </div>
  );

  return (
    <>
      <Notification />
      <div>{user === null ? renderLoginForm() : renderBlogList()}</div>
    </>
  );
};

export default App;
