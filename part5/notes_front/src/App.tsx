import React, {useState, useEffect} from 'react';
import SingleNote   from './components/Note';
import noteService from './services/notes';
import Notification from './components/Notification';
import Footer from './components/Footer';
import { LoginForm } from './components/LoginForm';
import { newNote, Note, UserToken } from './utils/types';
import { login } from './services/login';
import { Togglable } from './components/Togglable';
import { NoteForm } from './components/NoteForm';

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showAll, setShowAll] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [user, setUser] = useState<UserToken | null>(null);

  useEffect(() => {
    console.log('effect');
    void noteService
      .getAll()
      .then(initialNotes => {
        console.log('promise fulfilled');
        setNotes(initialNotes);
      });
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedNoteappUser');
    if(loggedUserJson) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const user: UserToken = JSON.parse(loggedUserJson);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  type PropsHandleLogin = { username: string, password: string };

  const handleLogin = ({username, password}: PropsHandleLogin) => {
    void(async() => {
      try {
        const user = await login({ username, password });
 
        window.localStorage.setItem(
         'loggedNoteappUser', JSON.stringify(user)
        );
 
        noteService.setToken(user.token);
        setUser(user);
      } catch (exception) {
        setErrorMessage('Wrong credentials');
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    })();
   };

  const addNote =  (noteObject: newNote) => {
    void(async() => {
      const returnedNote = await noteService.create(noteObject);
      setNotes(notes.concat(returnedNote));
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

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true);

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm login = {handleLogin}/>
    </Togglable>  
  );

  const noteForm = () => (
    <Togglable buttonLabel='new note'>
      <NoteForm createNote = {addNote}/>  
    </Togglable>
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