const resource = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(resource)

  if (!response.ok) throw new Error('Failed to fetch anecdotes')

  return await response.json()
}

const create = async (content) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0 }),
  }

  const response = await fetch(resource, options)

  if (!response.ok) throw new Error('Failed to create anecdote')

  return await response.json()
}

export default {
  getAll,
  create,
}