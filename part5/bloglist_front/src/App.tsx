import React, { useState, useEffect } from 'react';
import { SingleBlog } from './components/Blog';
import { getAll } from './services/blogs';
import { login } from './services/login';
import { Blog, UserToken } from './utils/types';

const App = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<UserToken | null>(null);

  useEffect(() => {
   void getAll()
    .then(blogs => {
      setBlogs(blogs);
    });
  }, []);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    void(async() => {
      event.preventDefault();
      try {
        const user = await login({ username, password});

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

  return (
    <div>
      {user === null ?
        <div>
          <h2>log in to application</h2>
          {loginForm()}
        </div> : 
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged-in</p>
          {blogs.map(blog => (
            <SingleBlog key = {blog.id} blog = {blog} />
          ))}
        </div> 
      }
    </div>
  );
};

export default App;
