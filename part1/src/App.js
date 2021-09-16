import React from 'react'

const Hello = (props) => {
  return (
    <div>
     <p> Hello {props.name}, you are {props.age} years old
     </p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
    greetings app created by <a href = "https://google.com">Google</a>
    </div>
  )
}

const App = () => {
  const name = 'Kaede'
  const age  = 17

  return (
    <>
     <h1> Greetings </h1>
     <Hello name = "Kirie" age = {17 + 5} />
     <Hello name = {name}  age = {age} />
     <Footer />
    </>
  )

/*
  const now = new Date()
  const a = 10
  const b = 20
*/
  //console.log('Hello from component')
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

//hi

export default App
