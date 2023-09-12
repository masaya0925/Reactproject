/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState } from "react";
import { Link, Navigate, Route, Routes, useMatch } from "react-router-dom";
import { Alert, AppBar, Button, Container, Toolbar } from "@mui/material";
import { NoteType } from "./types";
import { Login } from "./login";
import { Note } from "./components/Note";
import { Notes } from "./components/Notes";
import { Users } from "./components/Users";
import { Home } from "./components/Home";

const App = () => {

    const [notes] = useState<NoteType[]>(
      [
        {
          id: 1,
          content: 'HTML is easy',
          important: true,
          user: 'Matti Luukkainen'
        },
        {
          id: 2,
          content: 'Browser can execute only JavaScript',
          important: false,
          user: 'Matti Luukkainen'
        },
        {
          id: 3,
          content: 'Most important methods of HTTP-protocol are GET and POST',
          important: true,
          user: 'Arto Hellas'
        }
      ]
    );
  
    const [user, setUser] = useState<string>('');
    const [message, setMessage] = useState<string>('');
  
    const login = (user: string) => {
      setUser(user);
      setMessage(`Welcome ${user}`);
      setTimeout(() => {
        setMessage('');
      }, 10000);
    };
    
    const match = useMatch('/notes/:id');
    const note = match 
      ? notes.find(n => n.id === Number(match.params.id))
      : null;
  
    return (
      <Container>
        {(message &&
          <Alert severity="success">
            {message}
          </Alert>
        )}
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to='/'>
              home
            </Button>
            <Button color="inherit" component={Link} to='/notes'>
              notes
            </Button>
            <Button color="inherit" component={Link} to='/users'>
              users
            </Button> 
            {user 
              ? <em>{user} logged in</em>
              : <Button color="inherit" component={Link} to = '/login'>
                 login
                </Button> 
            }
          </Toolbar>
        </AppBar>
  
        <Routes>
          <Route path='/notes/:id' element = {<Note note = {note}/>} />
          <Route path='/notes' element = {<Notes notes = {notes}/>} />
          <Route path='/users' element = {user ? <Users /> : <Navigate replace to ='/login' />} />
          <Route path='/login' element = {<Login onLogin={login}/>} />
          <Route path='/' element = {<Home />} />
        </Routes>
       <footer>
        <div>
         <br />
         <em>Note App, Department of Computer Science 2023</em>
        </div>
       </footer>
      </Container>
    );
  };

  export default App;