import React, { useState, useEffect, useRef } from "react";

import { SingleBlog } from "./components/Blog";
import { Blog, NewBlog, RootState, UserToken } from "./utils/types";
import { Togglable } from "./components/Togglable";
import { BlogForm } from "./components/BlogForm";
import { setNotifications } from "./reducers/notificationReducer";
import {
  createBlog,
  getBlogs,
  likedBlog,
  removeBlog,
} from "./reducers/blogReducers";
import { Notification } from "./components/Notification";
import { useDispatch } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { getUser, logOutUser, loginUser } from "./reducers/userReducers";

const App = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const dispatchUser: ThunkDispatch<UserToken, unknown, AnyAction> =
    useDispatch();
  const dispatchBlogs: ThunkDispatch<Blog[], unknown, AnyAction> =
    useDispatch();

  const storeBlog = useSelector((state: RootState) => state.blogs);
  const storeUser = useSelector((state: RootState) => state.user);
  console.log(storeUser);

  useEffect(() => {
    try {
      void dispatchBlogs(getBlogs());
    } catch (e) {
      dispatch(
        setNotifications({
          severity: "error",
          message: "Unable to retrieve Blogs",
        })
      );
    }
  }, []);

  useEffect(() => {
    void dispatchUser(getUser());
  }, []);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      void dispatchUser(loginUser(username, password));
      setUsername("");
      setPassword("");
      dispatch(
        setNotifications({
          severity: "success",
          message: `Welcome ${username}`,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(
        setNotifications({ severity: "error", message: "Login Failed" })
      );
    }
  };

  const handleLogout = () => {
    void dispatchUser(logOutUser());
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
    void dispatchBlogs(createBlog(blogObject, dispatch));
    blogFormRef.current.toggleVisibility();
  };

  const likeBlog = (targetBlog: Blog) => {
    try {
      void dispatchBlogs(likedBlog(targetBlog, dispatch));
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
  };

  const deleteBlog = (targetBlog: Blog) => {
    void dispatchBlogs(removeBlog(targetBlog, dispatch));
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
        {storeUser.name} logged-in
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </p>
      <h2>create new</h2>
      {createBlogForm()}
      {storeBlog.map((blog) => (
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
      <div>{storeUser.name === "" ? renderLoginForm() : renderBlogList()}</div>
    </>
  );
};

export default App;
