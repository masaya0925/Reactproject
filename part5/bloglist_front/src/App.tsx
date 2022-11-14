import React, { useState, useEffect } from 'react';
import  axios  from 'axios';
import { Alert } from '@mui/material';

import { SingleBlog } from './components/Blog';
import { getAll, setToken, create } from './services/blogs';
import { login } from './services/login';
import { Blog, UserToken } from './utils/types';

const App = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [user, setUser] = useState<UserToken | null>(null);

  useEffect(() => {
    void(async() => {
      try {
        const blogs = await getAll();
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
           setErrorMessage(JSON.stringify(err.response?.data.error));
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
        <input type = 'text' value = {username} name = 'Username'
          onChange = {({ target }) => setUsername(target.value)}/> 
      </div>
      <div>
        password
        <input type = 'password' value = {password} name = 'Password' 
          onChange = {({ target }) => setPassword(target.value)}/>
      </div>
      <button type = 'submit'>login</button>
    </form>
  );

  const addBlog = (event: React.FormEvent<HTMLFormElement>) => {
    void(async() => {
      event.preventDefault();
      try {
        const blogObj = {
          title: title,
          author: author,
          url: url,
          likes: 0
        };
    
        const returnedBlog = await create(blogObj);
        setBlogs(blogs.concat(returnedBlog));
        setTitle('');
        setAuthor('');
        setUrl('');
        setSuccessMessage(`A new blog "${blogObj.title}" by ${blogObj.author} added.`);
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000);
      } catch (err) {
        if(axios.isAxiosError(err)){
          setErrorMessage(JSON.stringify(err.response?.data.error));
          setTimeout(() => {
            setErrorMessage('');
          }, 5000);
        }
      }
    })();
  };

  const createBlogForm = () => (
    <form onSubmit = {addBlog}>
      <div>
        title
        <input type = 'text' value = {title} name = 'Title' 
          onChange = {({ target }) => setTitle(target.value)}/>
      </div>
      <div>
        author
        <input type = 'text' value = {author} name = 'Author'
          onChange = {({ target }) => setAuthor(target.value)}/>
      </div>
      <div>
        url
        <input type = 'text' value = {url} name = 'Url'
          onChange = {({ target }) => setUrl(target.value)}/>
      </div>
      <button type = 'submit'>create</button>
    </form>
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
          {blogs.map(blog => (
            <SingleBlog key = {blog.id} blog = {blog} />
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