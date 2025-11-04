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
const { setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

// Exports
export const { voteAnecdote, addAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer