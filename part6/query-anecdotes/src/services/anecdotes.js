const resource = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await fetch(resource)
  if (!response.ok) throw new Error('Failed to fetch anecdotes')
  return await response.json()
}

export const createAnecdote = async anecdote => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(anecdote),
  }

  const response = await fetch(resource, options)
  if (!response.ok) throw new Error('Failed to create anecdote')
  return await response.json()
}