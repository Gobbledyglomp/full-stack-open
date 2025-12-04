import { useState, useEffect } from 'react'

import Blogs from './components/Blogs'
import Login from './components/Login'
import Loading from './components/Loading'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  // States
  const [user, setUser] = useState(undefined)

  // Effects
  useEffect(() => {
    const user = window.localStorage.getItem('user')

    if (user) {
      const userParsed = JSON.parse(user)
      blogService.setToken(userParsed.token)
      setUser(userParsed)
    } else {
      setUser(null)
    }
  }, [])

  // Functions
  const login = async (event, username, password) => {
    event.preventDefault()

    const user = await loginService.login({ username, password })
    blogService.setToken(user.token)
    window.localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }

  // Render
  if (user === undefined) return <Loading />

  if (user === null) {
    return <Login login={login} />
  }

  return <Blogs user={user} />
}

export default App
