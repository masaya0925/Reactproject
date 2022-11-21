import React from "react";


type Props = {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    handleUsernameChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    username: string,
    password: string
};

export const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}: Props) => {
    return (
    <form onSubmit = {handleSubmit}>
      <div>
        username
        <input value = {username} 
          onChange = {handleUsernameChange}
        />
      </div>
      <div>
        password
        <input type = 'password' 
          value = {password} 
          onChange = {handlePasswordChange}
        />
      </div>
      <button type = 'submit'>login</button>
    </form>
  );
};