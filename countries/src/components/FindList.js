import React from 'react'
import Country from './Country'
import CountryDetail from './CountryDetail'
const FindList = ({countries, find, setFind}) => {
  const filter = countries.filter(result => result.name.toLowerCase().includes(find.toLowerCase()))
  return(
    <div>
      { filter.length > 10 ?
         <p>too many countries</p>
        : filter.length === 1 ?
          <CountryDetail country = {filter[0]}/>
        : filter.map(result =>
          <Country key = {result.name} country = {result} setFind ={setFind}/>
        )
      }
    </div>
  )
}

export default FindList
