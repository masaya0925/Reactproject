import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
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
       <Form onSubmit = {onSubmit}>
        <Form.Group>
        <Form.Label>username:</Form.Label>
        <Form.Control
          type="text"
          name="username"
        />
        <Form.Label>password:</Form.Label>
        <Form.Control
          type="password"
        />
        <Button variant="primary" type = 'submit'>
          login
        </Button>
        </Form.Group>
       </Form>
      </>
    );
  };