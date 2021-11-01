import React, { useState } from 'react'


const Vote = ({vote}) => {
  return(
    <button onClick = {vote}>
    vote
    </button>
  )
}


const Button = ({clicked}) => {
    return (
       <button onClick = {clicked}>
       next anecdotes
       </button>
    )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(7).fill(0))
  const copy = [...points]

  const onclicked = () => {
    setSelected(Math.floor(Math.random()*7))
  }


  const vote = () => {
    copy[selected] += 1
    setPoints(copy)
    console.log(copy)
  }

  const mostVote = () => points.reduce((pre, cur) => Math.max(pre, cur))

  const mostVoteIndex = () => points.indexOf(mostVote())



  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Vote vote = {vote} />
      <Button clicked = {onclicked}/>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[mostVoteIndex()]}</p>
      <p>has{mostVote()}votes</p>
    </div>
  )
}

export default App;
