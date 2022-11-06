import React, {useState, useEffect} from 'react'
import Note  from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'
import loginService from './services/login'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    console.log('effect')
    noteService
      .getAll()
      .then(initialNotes => {
        console.log('promise fulfilled')
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedNoteappUser')
    if(loggedUserJson){
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception);
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }

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

  const loginForm = () => (
    <form onSubmit = {handleLogin}>
      <div>
        username
        <input type = "text" value = {username} name = "Username"
          onChange = {({ target }) => setUsername(target.value)}/>
      </div>
      <div>
        password
        <input type = "password" value = {password} name = "Password"
          onChange = {({ target }) => setPassword(target.value)}/>
      </div>
      <button type = "submit">login</button>
    </form>
  )

  const noteForm = () => (
    <form onSubmit = {addNote}>
      <input value = {newNote}
        onChange = {handleNoteChange}
      />
      <button type = "submit">save</button>
    </form>
  )

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

      <h2>Notes</h2>

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

      <Footer />
    </div>
  )
}

export default App
