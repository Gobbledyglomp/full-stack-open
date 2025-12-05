import { useState } from 'react'

import Notification from './Notification'
import useNotify from '../hooks/useNotify'

const Login = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const notify = useNotify()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await login(username, password)
    } catch (error) {
      notify('ERROR', error.response.data.error)
    }
  }

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
