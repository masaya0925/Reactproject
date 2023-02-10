import React, { useState, useEffect, useRef } from 'react';
import  axios  from 'axios';
import { Alert } from '@mui/material';

import { SingleBlog } from './components/Blog';
import { getAll, setToken, create, updateLikes, remove } from './services/blogs';
import { login } from './services/login';
import { Blog, NewBlog, UserToken } from './utils/types';
import { Togglable } from './components/Togglable';
import { BlogForm } from './components/BlogForm';

const App = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<UserToken | null>(null);

  useEffect(() => {
    void(async() => {
      try {
        const blogs = await getAll();
        blogs.sort((a, b) => b.likes - a.likes);
        setBlogs(blogs);
      } catch (e) {
        setErrorMessage('Unable to retrieve Blogs');
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
      }
    })();
  }, []);

  useEffect(() => {
    const loggedBlogJSON = window.localStorage.getItem('loggedBlogappUser');
    if(loggedBlogJSON) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const user: UserToken = JSON.parse(loggedBlogJSON);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    void(async() => {
      event.preventDefault();
      try {
        const user = await login({ username, password });

        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
        );
        
        setToken(user.token);
        setUser(user);
        setUsername('');
        setPassword('');
        setSuccessMessage(`Welcome ${user.username}.`);
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000);
      } catch (err) {
        if(axios.isAxiosError(err)){
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setErrorMessage(err.response?.data.error);
          setTimeout(() => {
            setErrorMessage('');
          }, 5000); 
        }  
      }
    })(); 
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedBlogappUser');
    setSuccessMessage('Logged out.');
    setTimeout(() => {
     setSuccessMessage('');
    }, 5000);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input id = 'username' type = 'text' value = {username} name = 'Username'
          onChange = {({ target }) => setUsername(target.value)}/> 
      </div>
      <div>
        password
        <input id = 'password' type = 'password' value = {password} name = 'Password' 
          onChange = {({ target }) => setPassword(target.value)}/>
      </div>
      <button id = 'login-button' type = 'submit'>login</button>
    </form>
  );

  const blogFormRef = useRef({} as { toggleVisibility: () => void});

  const addBlog = (blogObject: NewBlog) => {
    void(async() => {
      try {  
        const returnedBlog = await create(blogObject);
        setBlogs(blogs.concat(returnedBlog).sort((a, b) => b.likes - a.likes));
        blogFormRef.current.toggleVisibility();
        setSuccessMessage(`A new blog "${blogObject.title}" by ${blogObject.author} added.`);
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000);
      } catch (err) {
        if(axios.isAxiosError(err)){
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setErrorMessage(err.response?.data.error);
          setTimeout(() => {
            setErrorMessage('');
          }, 5000);
        }
      }
    })();
  };

  const likeBlog = (targetBlog: Blog) => {
    void(async() => {
      try {
        await updateLikes(targetBlog);
        setBlogs(blogs.map(blog => blog.id !== targetBlog.id ? blog: targetBlog)
                      .sort((a, b) => b.likes - a.likes));
        setSuccessMessage(`Liked Blog Title: ${targetBlog.title}, Author:${targetBlog.author}`);
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000); 
        
      } catch (err) {
        if(axios.isAxiosError(err)){
        setErrorMessage(err.response?.statusText);
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
       }
      }
    })();
  };

  const deleteBlog =  (targetBlog: Blog) => {
    void(async() =>{
      try {
        await remove(targetBlog);
        setBlogs(blogs.filter(blog => blog.id !== targetBlog.id)
                      .sort((a, b) => b.likes - a.likes));
        setSuccessMessage(`"${targetBlog.title}" ${targetBlog.author} is deleted.`);
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000);
      } catch (err) {
        if(axios.isAxiosError(err)){
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setErrorMessage(err.response?.data.error);
          setTimeout(() => {
            setErrorMessage('');
          }, 5000);
        }
      }
    })();
  };

  const createBlogForm = () => (
    <Togglable buttonLabel='new note' ref = {blogFormRef}>
      <BlogForm createBlog = {addBlog}/>
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
       <p>{user?.name} logged-in 
        <button type= 'button' onClick={handleLogout}>logout</button>
       </p>
      <h2>create new</h2>
        {createBlogForm()}
          {blogs.map( blog => (
            <SingleBlog key = {blog.id} 
                       blog = {blog}
                  pushLikes = {likeBlog}
                 pushDelete = {deleteBlog} />
        ))}
    </div>
  );

  const renderErrorMessage = () => (
    <Alert severity= 'error'>{errorMessage}</Alert>
  );

  const renderSuccessMessage = () => (
    <Alert severity= 'success'>{successMessage}</Alert>
  );

  return (
    <>
    {errorMessage !== '' && renderErrorMessage()}
    {successMessage !== '' && renderSuccessMessage()}
    <div>
      {user === null ? renderLoginForm() : renderBlogList()}
    </div>
    </>
  );
};

export default App;