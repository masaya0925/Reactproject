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

const Display = (props) => {
  return (
    <div>{props.counter}</div>
  )
}
/*
const Button = (props) => {
  return (
    <button onClick = {props.onClick}>
    {props.text}
    </button>
  )
}
*/
const History = (props) => {

  if(props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history : {props.allClicks.join(' ')}
    </div>
  )

}

const Button = ({handleClick, text}) => (

    <button onClick = {handleClick}>
    {text}
    </button>
)

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
/*
  const [clicks, setClicks] = useState({
    left:0, right:0
  })
*/


  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const [value, setValue] = useState(10)

  const setToValue = (newValue) => {
      setValue(newValue)
  }

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }


  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

  console.log('rendering...', counter)
  console.log([allClicks, setAll])
  const name = 'Kaede'
  const age  = 17

  return (
    <>
      {value}
      <button onClick = {() => setToValue(1000)}>thousand</button>
      <button onClick = {() => setToValue(0)}>zero</button>
      <button onClick = {() => setToValue(value + 1)}>increment</button>
      {left}
      <Button handleClick = {handleLeftClick} text = 'left' />
      <Button handleClick = {handleRightClick} text = 'right' />
      {right}
      <History allClicks = {allClicks} />
      <p>{allClicks.join(' ')}</p>

     <Display counter = {counter} />

     <Button
        onClick = {increaseByOne}
        text    = 'plus'
     />
     <Button
        onClick = {setToZero}
        text    = 'zero'
     />
     <Button
        onClick = {decreaseByOne}
        text    = 'minus'
     />
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
