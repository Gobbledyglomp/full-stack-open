import { useState, useEffect } from 'react'

import Blogs from './components/Blogs'
import Login from './components/Login'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  // States
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  // Effects
  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    }
  }, [user])

  // Functions
  const login = async (event, username, password) => {
      event.preventDefault()

      try {
        const user = await loginService.login({ username, password })
        console.log('Login status:', user)
        setUser(user)
      } catch (e) {
        console.error(e)
      }
  }

  // Render
  if (user === null) {
    return (
      <Login login={login} />
    )
  }

  return (
    <Blogs 
      blogs={blogs}
      user={user}
    />
  )
}

export default App