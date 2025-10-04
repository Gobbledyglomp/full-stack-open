import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1> 

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) => 
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }  
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const average = (good - bad) / all
  const positivePercentage = (good / all) * 100 + " %"

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <>
      <div>
        <Header text="give feedback" />
        <Button onClick={increaseGood} text="good" />
        <Button onClick={increaseNeutral} text="neutral" />
        <Button onClick={increaseBad} text="bad" /> 
      </div>
      <div>
        <Header text="statistics" />
        <Statistics 
          good={good} 
          neutral={neutral}
          bad={bad}
          all={all}
          average={average}
          positive={positivePercentage}
        />
      </div>
    </>
  )
}

export default App