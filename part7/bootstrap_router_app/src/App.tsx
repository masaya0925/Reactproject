/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState } from "react";
import { Link, Navigate, Route, Routes, useMatch } from "react-router-dom";
import { Alert, Nav, Navbar } from "react-bootstrap";
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
  
    const padding = { padding: 5 };
  
    const match = useMatch('/notes/:id');
    const note = match 
      ? notes.find(n => n.id === Number(match.params.id))
      : null;
  
    return (
      <div className="container">
        {(message &&
          <Alert variant="success">
            {message}
          </Alert>
        )}
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" as="span">
                <Link style = {padding} to='/'>home</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style = {padding} to='/notes'>notes</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style = {padding} to='/users'>users</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                {user 
                  ? <em>{user} logged in</em>
                  : <Link style = {padding} to = '/login'>login</Link> 
                }
              </Nav.Link>
            </Nav>
         </Navbar.Collapse>
        </Navbar>
  
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
      </div>
    );
  };

  export default App;