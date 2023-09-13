/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Routes, Route, Link, 
         Navigate, useNavigate, useMatch } from 'react-router-dom';

import styled from 'styled-components';

const Button = styled.button<{ primary: string }>`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`;

const Input = styled.input`
  margin: 0.25em;
`;

const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`;

const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
`;

const Footer = styled.div`
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
`;

type NoteType = {
  id: number;
  user: string;
  content: string;
  important: boolean;
};

type PropsNote = {
  note: NoteType | null | undefined;
};

type PropNotes = {
  notes: NoteType[];
};

type PropLogin = {
  onLogin : (user: string) => void;
};

const Home = () => (
  <>
   <h2>TKTL notes App</h2>
   <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry.s standard dummy text ever since the 1500s, 
    when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
    It has survived not only five centuries, but also the leap into electronic typesetting, 
    remaining essentially unchanged. 
    It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
    and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    </p>
  </>
);

const Note = ({ note }: PropsNote) => {
  if(note === null || note === undefined) return <div />;
  return (
    <>
     <h2>{note.content}</h2>
     <div>{note.user}</div>
     <div>
      <strong>{note.important ? 'important' : ''}</strong>
     </div>
    </>
  );
};

const Notes = ({ notes }: PropNotes) => (
  <>
   <h2>Notes</h2>
   <ul>
     {notes.map(note => (
       <li key = {note.id}>
        <Link to = {`/notes/${note.id}`}>{note.content}</Link>
       </li>
     ))}
   </ul>
  </>
);

const Users = () => (
  <div>
    <h2>TKTL notes app</h2>
    <ul>
      <li>Matti Luukkainen</li>
      <li>Juha Tauriainen</li>
      <li>Arto Hellas</li>
    </ul>
  </div>
);

const Login = (props: PropLogin) => {
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
        username: 
        <Input />
      </div>
      <div>
        password: 
        <Input type = 'password' />
      </div>
      <Button type = 'submit' primary=''>
        login
      </Button>
     </form>
    </>
  );
};

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

  const login = (user: string) => {
    setUser(user);  
  };

  const padding = { padding: 5 };

  const match = useMatch('/notes/:id');
  const note = match 
    ? notes.find(n => n.id === Number(match.params.id))
    : null;

  return (
    <Page>
      <Navigation>
       <Link style = {padding} to='/'>home</Link>
       <Link style = {padding} to='/notes'>notes</Link>
       <Link style = {padding} to='/users'>users</Link>
       {user 
         ? <em>{user} logged in</em>
         : <Link style = {padding} to = '/login'>login</Link> 
       }
      </Navigation>

      <Routes>
        <Route path='/notes/:id' element = {<Note note = {note}/>} />
        <Route path='/notes' element = {<Notes notes = {notes}/>} />
        <Route path='/users' element = {user ? <Users /> : <Navigate replace to ='/login' />} />
        <Route path='/login' element = {<Login onLogin={login}/>} />
        <Route path='/' element = {<Home />} />
      </Routes>

     <Footer> 
       <em>Note App, Department of Computer Science 2023</em>
     </Footer>
    </Page>
  );
};


ReactDOM.render(
  <Router>
   <App />
  </Router>, 
  document.getElementById('root')
);

