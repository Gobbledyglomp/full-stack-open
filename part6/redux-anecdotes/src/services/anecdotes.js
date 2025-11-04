const resource = 'http://localhost:3001/anecdotes'

// GET /anecdotes
const getAll = async () => {
  const response = await fetch(resource)

  if (!response.ok) throw new Error('Failed to fetch anecdotes')

  return await response.json()
}

// GET /anecdotes/:id
const get = async id => {
  const response = await fetch(`${resource}/${id}`)

  if (!response.ok) throw new Error('Failed to fetch anecdote')

  return await response.json()
}

// POST /anecdotes
const create = async content => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0 }),
  }

  const response = await fetch(resource, options)

  if (!response.ok) throw new Error('Failed to create anecdote')

  return await response.json()
}

// PUT /anecdotes/:id
const vote = async (id, oldAnecdote) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...oldAnecdote,
      votes: oldAnecdote.votes + 1,
    }),
  }
  const putResponse = await fetch(`${resource}/${id}`, options)

  if (!putResponse.ok) throw new Error('Failed to change vote field of anecdote')

  return await putResponse.json()
}

export default {
  getAll,
  get,
  create,
  vote,
}