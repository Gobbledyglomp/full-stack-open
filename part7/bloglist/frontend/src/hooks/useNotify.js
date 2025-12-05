import { useDispatch } from 'react-redux'
import { notify as notifyAction } from '../reducers/notificationReducer'

const useNotify = () => {
  const dispatch = useDispatch()

  const notify = (type, text) => {
    dispatch(notifyAction(type, text))
  }

  return notify
}

export default useNotify
