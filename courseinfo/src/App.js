//import logo from './logo.svg';
//import './App.css';
import React from 'react'

/*
const Part = (props) => {
  return (
    <div>
      <p>This part is {props.part}, Exercisesnumber is {props.exercises} </p>
    </div>

  )
}
*/

const Header = (props) => {

  return (
    <div>
    <p>This course is {props.course}</p>
    </div>
  )

}


const Content = (props) => {
  return (
    <div>
     <p>This course is {props.parts[0].name} Exercisesnumber is {props.parts[0].exercises}</p>
     <p>This course is {props.parts[1].name} Exercisesnumber is {props.parts[1].exercises}</p>
     <p>This course is {props.parts[2].name} Exercisesnumber is {props.parts[2].exercises}</p>
    </div>
  )
}



const Total = (props) => {
  return (
    <div>
    <p>Total exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </div>
  )
}


const App = () => {

  const course = {
     name: 'Half Stack application development',
     parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course = {course.name}  />
      <Content parts = {course.parts} />
      <Total   parts = {course.parts} />
    </div>
  )
}

export default App;
