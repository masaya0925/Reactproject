import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { PropLogin } from "./types";

export const Login = (props: PropLogin) => {
    const { onLogin } = props;
    const navigate = useNavigate();
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onLogin('mluukkai');
      navigate('/');
    };
  
    return (
      <>
       <h2>Login</h2>
       <form onSubmit = {onSubmit}>
        <div>
          <TextField label="username" />
        </div>
        <div>
          <TextField label="password" type="password"/>
        </div>
        <div>
          <Button variant="contained" color="primary" type = 'submit'>
            login
          </Button>
        </div>
       </form>
      </>
    );
  };