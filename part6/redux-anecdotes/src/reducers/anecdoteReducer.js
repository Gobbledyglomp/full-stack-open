import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

// Slice
const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      return state.map(
        anecdote => anecdote.id !== id
          ? anecdote
          : { ...anecdote, votes: anecdote.votes + 1 }
      )
    },
    addAnecdote(state, action) {
      return [ ...state, action.payload ]
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

// Custom action creators
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(anecdoteSlice.actions.setAnecdotes(anecdotes))
  }
}
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.create(content)
    dispatch(anecdoteSlice.actions.addAnecdote(anecdote))
  }
}

// Exports
export const { voteAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer