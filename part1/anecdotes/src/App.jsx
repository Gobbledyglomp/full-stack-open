import { useState } from 'react'

const Header = ({ text }) =>
  <h1>
    {text}
  </h1>

const Anecdote = ({ anecdote, votes }) =>
  <>
    <p>
      {anecdote}
    </p>
    <p>
      Votes: {votes}
    </p>
  </>

const BestAnecdote = ({ anecdote, votes }) => {
  if (anecdote === null) {
    return (
      <p>
        No votes have been received.
      </p>
    )
  }
  return (
    <Anecdote anecdote={anecdote} votes={votes} />
  )
}

const Button = ({ onClick, text }) =>
  <button onClick={onClick}>
    {text}
  </button> 

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const voteAnecdote = current => {
    const newVotes = [...votes]
    newVotes[current] += 1
    setVotes(newVotes)
  }

  const selectRandom = () => {
    const randomFloat = Math.random() * anecdotes.length
    const randomInt = Math.floor(randomFloat)
    setSelected(randomInt)
  }

  const getAnecdote = index => {
    if (index === -1) {
      return null
    }
    return anecdotes[index]
  }

  const getBest = votes => {
    let best = { index: -1, votes: 0 }

    for (let i = 0; i < votes.length; i++) {
      if (votes[i] > best.votes) {
        best = { index: i, votes: votes[i] }
      }
    }

    return best.index
  }

  const best = getBest(votes)

  return (
    <>
      <div>
        <Header text="Anecdote of the day" />
        <Anecdote
          anecdote={getAnecdote(selected)}
          votes={votes[selected]}
        />        
        <Button onClick={() => voteAnecdote(selected)} text="Vote" />
        <Button onClick={selectRandom} text="Random" />
      </div>
      <div>
        <Header text="Anecdote with most votes" />
        <BestAnecdote
          anecdote={getAnecdote(best)}
          votes={votes[best]}
        />
      </div>
    </>
  )
}

export default App