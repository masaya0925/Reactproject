import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = (props) => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum] = useState('')
  const [ newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }, [])
  console.log('render', persons.length, 'persons')

  const addNumbers = (event) => {
    event.preventDefault()
  if(persons.some(person => person.name === newName)){ //名前の重複確認
    console.log('sameName')
    window.alert(newName + ' is already added to phonebook')
  } else if(persons.some(person => person.number === newNum)){ //番号の重複確認
    console.log('sameNum')
    window.alert(newNum + ' is already added to phonebook')
  } else {
    const perObj = {
      name: newName,
      number: newNum
    }
    setPersons(persons.concat(perObj))
  }
    setNewName('')
    setNewNum('')
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
      <Filter newFilter = {newFilter} handleFilterChange = {handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm addNumbers = {addNumbers} newName = {newName} newNum = {newNum}
        handleNameChange = {handleNameChange} handleNumberChange = {handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons = {persons} newFilter = {newFilter}/>
    </div>
  )
}

export default App
