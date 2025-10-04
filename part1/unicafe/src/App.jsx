import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1> 

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistics = ({ text, value }) => <>{text} {value}<br /></>

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

        <Statistics text="good" value={good} />
        <Statistics text="neutral" value={neutral} />
        <Statistics text="bad" value={bad} />
        <Statistics text="all" value={all} />
        <Statistics text="average" value={average} />
        <Statistics text="positive" value={positivePercentage} />
      </div>
    </>
  )
}

export default App