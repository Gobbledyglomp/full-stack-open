import { useContext } from 'react'
import NotificationContext from '../contexts/NotificationContext'

const Notification = () => {
  const { notification } = useContext(NotificationContext)

  // Style
  const style = {
    fontFamily: 'sans-serif',
    fontWeight: '700',
    color: notification.type === 'ERROR' ? '#d32f2f' : '#0288d1',
    backgroundColor: notification.type === 'ERROR' ? '#fff5f4' : '#e1f5fe',
    border: `3px solid ${
      notification.type === 'ERROR' ? '#d32f2f' : '#0288d1'
    }`,
    borderRadius: '12px',
    padding: '10px 16px',
    marginBottom: '10px',
    display: 'inline-block',
  }

  // Render
  if (notification.text === null) return null

  return (
    <div style={style} className="notification">
      {notification.text}
    </div>
  )
}

export default Notification
