import { useSelector } from 'react-redux'

const Notification = () => {
  // Redux hooks
  const notification = useSelector(({ notification }) => notification)
  const queue = useSelector(({ notification }) => notification.queue)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  }

  // Render
  if (queue === 0) return <></>

  return <div style={style}>{notification.message}</div>
}

export default Notification