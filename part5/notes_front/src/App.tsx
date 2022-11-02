import React, {useState, useEffect} from 'react';
import SingleNote   from './components/Note';
import noteService from './services/notes';
import Notification from './components/Notification';
import Footer from './components/Footer';
import { Note, UserToken } from './utils/types';
import { login } from './services/login';

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<string>('');
  const [showAll, setShowAll] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<UserToken | null>(null);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
   void(async() => {
     event.preventDefault();
     try {
       const user = await login({ username, password });
       setUser(user);
       setUsername('');
       setPassword('');
     } catch (exception) {
       setErrorMessage('Wrong credentials');
       setTimeout(() => {
         setErrorMessage(null);
       }, 5000);
     }
   })();
  };

  useEffect(() => {
    console.log('effect');
    void noteService
      .getAll()
      .then(initialNotes => {
        console.log('promise fulfilled');
        setNotes(initialNotes);
      });
  }, []);

  const addNote = (event: React.FormEvent<HTMLFormElement>) => {
   void(async() => {
     event.preventDefault();
     const noteObject = {
       content: newNote,
       date: new Date().toISOString(),
       important: Math.random() < 0.5,
       id: notes.length + 1,
     };
 
     const returnedNote = await noteService.create(noteObject);
     setNotes(notes.concat(returnedNote));
     setNewNote('');
   })();
  };

  const toggleImportanceOf = (id: string) => {
   void(async() => {
     const note = notes.find(n => n.id === id);
     if(note === undefined) {
       setErrorMessage('Note was not found.');
       setTimeout(() => {
         setErrorMessage(null);
       }, 5000);
       return;
     }
 
     const changedNote = {...note, important : !note.important};
 
     try {
       const returnedNote = await noteService.update(id, changedNote);
       setNotes(notes.map(note => (note.id !== id ? note : returnedNote)));
     } catch (error) {
       setErrorMessage(`Note '${note.content}' was already removed server`);
       setTimeout(() => {
         setErrorMessage(null);
       }, 5000);
     }
     console.log(`importance of ${id} needs to be toggled`);
   })();
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true);

  const loginForm = () => (
    <form onSubmit = {handleLogin}>
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

  const noteForm = () => (
    <form onSubmit = {addNote}>
      <input value = {newNote}
          onChange = {handleNoteChange}
      />
      <button type = "submit">save</button>
    </form>
  );

  return (
    <div>

     <h1>Notes</h1>

     <Notification message = {errorMessage}/>

     {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in</p>
          {noteForm()}
        </div>
     }
    
      <div>
        <button onClick = {() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <SingleNote 
            key = {note.id} 
            note = {note} 
            toggleImportance = {() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      
      <Footer />
    </div>
  );
};

export default App;