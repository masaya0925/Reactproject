import React, {useState, useEffect} from 'react'
import Note  from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, serPassword] = useState('')

  useEffect(() => {
    console.log('effect')
    noteService
      .getAll()
      .then(initialNotes => {
        console.log('promise fulfilled')
        setNotes(initialNotes)
      })
  }, [])
    console.log('render', notes.length, 'notes')


  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
      .catch(error => {
        console.log(error.response.data)
      })
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important : !note.important}

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(`Note '${note.content}' was already removed from server`)
        setTimeout(() => {setErrorMessage(null)}, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
      console.log(`importance of ${id} needs to be toggled`)
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('logging in with', username, password);
  }

  return (
    <div>
    <h1>Notes</h1>

    <Notification message = {errorMessage}/>

    <form onSubmit = {handleLogin}>
      <div>
        username
        <input type = "text" value = {username} name = "Username"
          onChange = {({ target }) => setUsername(target.value)}/>
      </div>
      <div>
        password
        <input type = "password" value = {password} name = "Password"
           onChange = {({ target }) => serPassword(target.value)}/>
      </div>
      <button type = "Submit">login</button>
    </form>
      <div>
        <button onClick = {() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note, i) =>
          <Note key = {i} note = {note} toggleImportance = {() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit = {addNote}>
      <input value = {newNote}
          onChange = {handleNoteChange}
      />
      <button type = "submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App
