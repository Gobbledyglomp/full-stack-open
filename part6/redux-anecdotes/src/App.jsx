import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote, addAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  // Redux hooks
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)

  const vote = id => {
    dispatch(voteAnecdote(id))
  }

  const handleCreation = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch(addAnecdote(content))
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {console.log(anecdotes)}
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
            has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))
      }
      <h2>create new</h2>
      <form onSubmit={handleCreation}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App
