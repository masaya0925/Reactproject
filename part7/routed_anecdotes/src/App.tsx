/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { PropsAnecdote, PropsNewAnecdote } from './types';


type PropsAnecdotes = {
  anecdotes: PropsAnecdote[];
};

const Menu = () =>  {
  const padding = {
    paddingRight: 5
  };
  return(
    <div>
     <Link style = {padding} to = '/'>anecdotes</Link>
     <Link style = {padding} to = '/create'>create new</Link>
     <Link style = {padding} to = '/about'>about</Link>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }: PropsAnecdotes) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(a => <li key = {a.id} >{a.content}</li>)}
    </ul>
  </div>
);

const About = () => (
  <div>
    <h2>About Anecdote App</h2>
    <p>According from Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is [a story with a point.]</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for <a href = 'https://fullstackopen.com/'>FullStackOpen</a>.
    
    See<a href = 'https://github.com/fullstack-hy2020/routed-anecdotes/blob/main/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/main/src/App.js</a> for the source code
  </div>
);

type PropsCreateNew = {
  addNew: (anecdote: PropsNewAnecdote) => void;
};

const CreateNew = ({ addNew }: PropsCreateNew) => {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [info, setInfo] = useState('');

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addNew({
      content,
      author,
      info,
      votes: 0
    });
  };

  return (
    <div>
      <h2>create new anecdote</h2>
      <form onSubmit = {handleSubmit}>
        <div>
          content
          <input name = 'content' value = {content} onChange = {e => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name = 'author' value = {author} onChange = {e => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name = 'info' value = {info} onChange = {e => setInfo(e.target.value)} />
        </div>
        <button type = 'submit'>create</button>
      </form>
    </div>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      id: 1,
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0
    },
    {
      id: 2,
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0
    }
  ]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [notification, setNotification] = useState('');

  const addNew = (anecdote: PropsNewAnecdote) => {
    const newAnecdote = {
      ...anecdote,
      id: Math.round(Math.random() * 10000)
    };
    
    setAnecdotes(anecdotes.concat(newAnecdote));
  };

  const anecdoteById = (id: number) => 
     anecdotes.find(a => a.id === id);
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const vote = (id: number) => {
    const anecdote = anecdoteById(id);

    if(anecdote === undefined) return;

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    };

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a));
  };

  return (
    <Router>
     <div>
       <h1>Software Anecdote</h1>
       <Menu />
       <Routes>
         <Route path = '/' element = {<AnecdoteList anecdotes={anecdotes}/>} />
         <Route path = '/create' element = {<CreateNew addNew = {addNew}/>} />
         <Route path = '/about'  element = {<About />} />
       </Routes>
       <Footer />
     </div>
    </Router>
  );
};

export default App;
