import React, { useState } from 'react'


const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age
  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

/*
const Footer = () => {
  return (
    <div>
    greetings app created by <a href = "https://google.com">Google</a>
    </div>
  )
}
*/

const App = () => {
  const [ counter, setCounter ] = useState(0)

  setTimeout(
    () => setCounter(counter + 1),
    1000
  )

  console.log('rendering...', counter)

  const name = 'Kaede'
  const age  = 17

  return (
    <>
      {counter}
     <h1> Greetings </h1>
     <Hello name = "Kirie" age = {17 + 5} />
     <Hello name = {name}  age = {age} />
    </>
  )
/*
  const now = new Date()
  const a = 10
  const b = 20
*/
/*HTML*/
/* return (
  <div>
    <p>Hello world, it is {now.toString()}</p>
    <p>
      {a} plus {b} is {a + b}
    </p>
  </div>
 )
*/

/*JSX*/
/*  return React.createElement (
    'div',
    null,
   React.createElement (
     'p', null, 'Hello world, it is ', now.toString()
    ),
   React.createElement (
     'p', null, a, ' plus ', b, ' is ', a + b
    )
  )
*/
}

export default App
