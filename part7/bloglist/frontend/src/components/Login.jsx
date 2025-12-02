import { useState, useRef } from "react"

import Notification from "./Notification"

const Login = ({ login }) => {
  // States
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  // Refs
  const notificationRef = useRef({ notify: null })

  // Effects
  const handleLogin = async (event) => {
    try {
      await login(event, username, password)
    } catch (error) {
      notificationRef.current.notify("error", error.response.data.error)
    } finally {
      setUsername("")
      setPassword("")
    }
  }

  // Render
  return (
    <>
      <h1>Log in to application</h1>
      <Notification ref={notificationRef} />
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
