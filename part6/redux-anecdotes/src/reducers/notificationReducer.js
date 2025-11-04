import { createSlice } from '@reduxjs/toolkit'

// Slice
const initialState = {
  type: 'info',
  message: '',
  queue: 0,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return {
        ...action.payload,
        queue: state.queue + 1,
      }
    },
    clearNotification(state) {
      return {
        ...state,
        queue: state.queue - 1,
      }
    },
  },
})

export default notificationSlice.reducer

// Custom action handlers
const { setNotification, clearNotification } = notificationSlice.actions

export const notify = (type, message, seconds) => {
  return async (dispatch) => {
    dispatch(setNotification({ type, message }))

    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}