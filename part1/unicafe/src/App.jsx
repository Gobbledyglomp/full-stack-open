import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1> 

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Feedback = ({ text, value }) => <>{text} {value}<br /></>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

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
        <Feedback text="good" value={good} />
        <Feedback text="neutral" value={neutral} />
        <Feedback text="bad" value={bad} />
      </div>
    </>
  )
}

export default App