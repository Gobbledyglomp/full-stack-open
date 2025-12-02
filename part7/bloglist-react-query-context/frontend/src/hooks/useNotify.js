import { useContext } from 'react'
import NotificationContext from '../contexts/NotificationContext'

const useNotify = () => {
  const { notificationDispatch } = useContext(NotificationContext)

  const notify = (type, text) => {
    notificationDispatch({ type, payload: text })
    setTimeout(
      () =>
        notificationDispatch({
          type: 'CLEAR',
        }),
      3000,
    )
  }

  const notifyInfo = (text) => {
    notify('INFO', text)
  }

  const notifyError = (text) => {
    notify('ERROR', text)
  }

  return {
    notify,
    notifyInfo,
    notifyError,
  }
}

export default useNotify
