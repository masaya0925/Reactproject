import React from 'react'

const Country = ({country, setFind}) => {
  return (
     <li style = {{listStyle:'none', padding:0}}>
     {country.name}<button onClick = {() => setFind(country.name)}>show</button>
     </li>
  )
}

export default Country
