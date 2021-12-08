import React from 'react'
import Weather from './Weather'

const CountryDetail = ({country}) => {
  return (
      <div>
      <h1>{country.name}</h1>
      <p>capital:{country.capital}</p>
      <p>population:{country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map(lang =>
          <li key = {lang.name}>{lang.name}</li>
        )}
      </ul>
      <img src = {country.flag} alt = {'Flag'} style = {{width:150, height:150}}/>
      <Weather country = {country}/>
      </div>
  )
}
export default CountryDetail
