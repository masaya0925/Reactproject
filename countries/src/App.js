import React, {useState, useEffect} from 'react'
import axios from 'axios'
import FindCountries from './components/FindCountries'
import FindList from './components/FindList'

const App = () => {
  const [countries, setCountries] = useState([])
  const [find, setFind] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
    .get('https://restcountries.com/v2/all')
    .then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
    })
  }, [])

  const handleFindChange = (event) => {
    setFind(event.target.value)
  }

  return (
    <div>
      <FindCountries find = {find} handler = {handleFindChange}/>
      <FindList find = {find} countries = {countries} setFind = {setFind}/>
    </div>
  )
}

export default App
