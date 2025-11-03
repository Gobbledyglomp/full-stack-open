import { useDispatch, useSelector } from 'react-redux'

import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setInfoNotification, clearNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  // Redux hooks
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase()
        .includes(filter.toLowerCase())
    )
  )

  // Handlers
  const handleVote = anecdote => {
    dispatch(setInfoNotification(`You voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)

    dispatch(voteAnecdote(anecdote.id))
  }

  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleVote={handleVote}
          />
        ))
      }
    </div>
  )
}

export default AnecdoteList