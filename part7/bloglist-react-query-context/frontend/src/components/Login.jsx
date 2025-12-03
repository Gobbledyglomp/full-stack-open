import { useState, useRef } from 'react'

import Notification from './Notification'
import useNotify from '../hooks/useNotify'

const Login = ({ login }) => {
  // States
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { notifyError } = useNotify()

  // Effects
  const handleLogin = async (event) => {
    try {
      await login(event, username, password)
    } catch (error) {
      notifyError(error.response.data.error)
    } finally {
      setUsername('')
      setPassword('')
    }
  }

  // Render
  return (
    <>
      <h1>Log in to application</h1>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </>
  )
}

export default Login
