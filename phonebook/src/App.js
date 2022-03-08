import React, {useState, useEffect} from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personservice from './services/persons'
import Notification from './components/Notification'

const App = (props) => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum] = useState('')
  const [ newFilter, setNewFilter] = useState('')
  const [ message, setMessage] = useState(null)
  const [ type, setType] = useState('')

  useEffect(() => {
    console.log('effect')
    personservice
    .getAll()
    .then(initialPersons => {
      console.log('promise fulfilled')
      setPersons(initialPersons)
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }, [])

  const sameName = persons.find(person => person.name === newName)

  const addNumbers = (event) => {
    event.preventDefault()
    if(sameName) {
      if(window.confirm(newName + ' is already added to phonebook, replace the old number with a new one?')){
        const changedperson = {...sameName, number: newNum}
        console.log('changed... ',changedperson)
        personservice
          .update(changedperson.id, changedperson)
          .then(returnedPersons => {
            setPersons(persons.map(person => person.id !== changedperson.id ? person : returnedPersons))
            setMessage(`Changed ${newName}'s number`)
            setType('success')
            setTimeout(() => {setMessage(null)}, 5000)
          })
          .catch(error => {
            setType('error')
            if(error.response.status === 404){
              setMessage(`${newName} has already been deleted from server`)
              setPersons(persons.filter(p => p.id !== sameName.id))
            } else {
              setMessage(error.response.data.error)
            }
            setTimeout(() => {setMessage(null)}, 5000)
          })
      }
    } else {
      const perObj = {
        name: newName,
        number: newNum
      }
      personservice
        .create(perObj)
        .then(returnedPersons => {
          setPersons(persons.concat(returnedPersons))
          setMessage(`Added  ${newName}`)
          setType('success')
          setTimeout(() => {setMessage(null)}, 5000)
        })
        .catch(error => {
          setMessage(error.response.data.error)
          setType('error')
          setTimeout(() => {setMessage(null)}, 5000)
        })
    }
    setNewName('')
    setNewNum('')
  }

  const deleteNumbers = (id, name) => {
    if(window.confirm(`Delete ${name}`)) {
      personservice
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setMessage(`Deleted ${name}`)
          setType('success')
          setTimeout(() => {setMessage(null)}, 5000)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  //console.log(persons.map(person => person.name.toLowerCase().includes(newFilter.toLowerCase())))
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {message} type = {type}/>
      <Filter newFilter = {newFilter} handleFilterChange = {handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm addNumbers = {addNumbers} newName = {newName} newNum = {newNum}
        handleNameChange = {handleNameChange} handleNumberChange = {handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons = {persons} newFilter = {newFilter} remove = {deleteNumbers}/>
    </div>
  )
}

export default App
