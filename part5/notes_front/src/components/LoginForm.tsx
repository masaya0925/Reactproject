import React, { useState } from "react";


type Props = {
  login: (user: {username: string, password: string}) => void
};

export const LoginForm = ({ login }: Props) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({username, password});
    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit = {handleLogin}>
      <div>
        username
        <input    id = "username"
               value = {username} 
            onChange = {({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input   id = "password"
               type = 'password' 
              value = {password} 
           onChange = {({ target }) => setPassword(target.value)}
        />
      </div>
      <button id = "login-button" type = 'submit'>login</button>
    </form>
  );
};