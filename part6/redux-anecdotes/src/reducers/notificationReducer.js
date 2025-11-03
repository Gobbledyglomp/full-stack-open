import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  type: 'info',
  message: '',
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setInfoNotification(state, action) {
      return {
        type: 'info',
        message: action.payload,
      }
    },
    setErrorNotification(state, action) {
      return {
        type: 'error',
        message: action.payload,
      }
    },
    clearNotification() {
      return {
        type: 'info',
        message: '',
      }
    },
  },
})

export const { setInfoNotification, setErrorNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
