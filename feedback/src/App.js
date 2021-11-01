import React, { useState } from 'react'


const Button = ({handleClick, text}) => (

    <button onClick = {handleClick}>
    {text}
    </button>
)

const StatisticsLine = ({text, value}) => {

  if(text.match('positive')) {
    return (
      <table>
        <tbody>
          <tr>
            <td className = {'tbl'}>{text}</td>
            <td className = {'tbl'}>{value}%</td>
          </tr>
        </tbody>
      </table>
    )
  }

  return (
    <table>
      <tbody>
        <tr>
          <td className = {'tbl'}>{text}</td>
          <td className = {'tbl'}>{value}</td>
        </tr>
      </tbody>
    </table>
  )
}


const Statistics = (props) => {
  const ave = () => props.score.reduce((pre, cur) => pre + cur,0) / props.length

  if(props.length === 0) {
    return (
      <div>
        No Feedback given
      </div>
    )

  } else {
    return (
      <div>
      <StatisticsLine text = 'good'    value = {props.good}/>
      <StatisticsLine text = 'neutral' value = {props.neutral}/>
      <StatisticsLine text = 'bad'     value = {props.bad}/>
      <StatisticsLine text = 'all'     value = {props.length}/>
      <StatisticsLine text = 'average' value = {ave()}/>
      <StatisticsLine text = 'positive' value = {props.good / props.length * 100} />
      </div>
    )
  }
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [score ,setScore] = useState([])


  const handleGoodClick = () => {
    setGood(good + 1)
    setScore(score.concat(1))
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setScore(score.concat(0))
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setScore(score.concat(-1))
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick = {handleGoodClick} text = 'good' />
      <Button handleClick = {handleNeutralClick} text = 'neutral' />
      <Button handleClick = {handleBadClick} text = 'bad' />
      <h2>statics</h2>
      <Statistics good = {good} neutral = {neutral} bad = {bad} score = {score} length = {score.length}/>


    </div>
  )
}

export default App
