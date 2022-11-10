import React, { useState, useEffect } from 'react';
import { SingleBlog } from './components/Blog';
import { getAll, setToken, create } from './services/blogs';
import { login } from './services/login';
import { Blog, UserToken } from './utils/types';

const App = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [user, setUser] = useState<UserToken | null>(null);

  useEffect(() => {
   void getAll()
    .then(blogs => {
      setBlogs(blogs);
    });
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
      } catch (exception) {
        setErrorMessage('Wrong exception');
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    })(); 
  };

  const handleLogout = () => {
   setUser(null);
   window.localStorage.removeItem('loggedBlogappUser');
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

  return (
    <div>
      {user === null ?
        <div>
          <h2>log in to application</h2>
          {loginForm()}
        </div> : 
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged-in 
          <button type= 'button' onClick={handleLogout}>logout</button>
          </p>
          <h2>create new</h2>
          {createBlogForm()}
          {blogs.map(blog => (
            <SingleBlog key = {blog.id} blog = {blog} />
          ))}
        </div> 
      }
    </div>
  );
};

export default App;
