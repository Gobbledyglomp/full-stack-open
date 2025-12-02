import { createContext, useReducer } from 'react'

const initialState = {
  type: null,
  text: null,
}

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'INFO':
      return {
        type: 'INFO',
        text: action.payload,
      }
    case 'ERROR':
      return {
        type: 'ERROR',
        text: action.payload,
      }
    case 'CLEAR':
      return { ...initialState }
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    ...initialState,
  })

  return (
    <NotificationContext.Provider
      value={{ notification, notificationDispatch }}
    >
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
