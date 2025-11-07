import { useContext } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { getAnecdotes, updateAnecdote  } from './services/anecdotes'
import NotificationContext from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()

  const { notificationDispatch } = useContext(NotificationContext)

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (newAnecdote) => {
      // Update locally for sake of optimization
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote =>
        anecdote.id !== newAnecdote.id
          ? anecdote
          : newAnecdote
      ))
    },
  })

  const handleVote = anecdote => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })

    notificationDispatch({ type: 'SET', payload: `Anecdote '${anecdote.content}' voted` })
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, 5000)
  }

  // Queries
  const queryResult = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
  })

  if (queryResult.isError) {
    return <div>Anecdote service not available due to problems in server</div>
  }
  if (queryResult.isLoading) {
    return <div>Loading...</div>
  }

  const anecdotes = queryResult.data

  // Render
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
