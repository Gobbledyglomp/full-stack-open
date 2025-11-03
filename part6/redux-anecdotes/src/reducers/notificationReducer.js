import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  type: 'info',
  message: 'Example info notification',
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
  },
})

export const { setInfoNotification, setErrorNotification } = notificationSlice.actions
export default notificationSlice.reducer
