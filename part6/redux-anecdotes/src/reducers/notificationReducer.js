import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  type: 'info',
  message: '',
  queue: 0,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setInfoNotification(state, action) {
      return {
        type: 'info',
        message: action.payload,
        queue: state.queue + 1,
      }
    },
    setErrorNotification(state, action) {
      return {
        type: 'error',
        message: action.payload,
        queue: state.queue + 1,
      }
    },
    clearNotification(state) {
      return {
        type: 'info',
        message: state.message,
        queue: state.queue - 1,
      }
    },
  },
})

export const { setInfoNotification, setErrorNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
