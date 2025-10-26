import { useState, useEffect } from 'react'

import Blogs from './components/Blogs'
import Login from './components/Login'
import Loading from './components/Loading'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  // States
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(undefined)

  //
  // Effects
  //
  useEffect(() => {
    const user = window.localStorage.getItem('user')

    if (user) {
      const userParsed = JSON.parse(user)
      setUser(userParsed)
    } else {
      setUser(null)
    }
  }, [])

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    }
  }, [user])

  //
  // Functions
  //
  const login = async (event, username, password) => {
      event.preventDefault()

      try {
        const user = await loginService.login({ username, password })
        window.localStorage.setItem('user', JSON.stringify(user))
        setUser(user)
      } catch (e) {
        console.error(e)
      }
  }

  //
  // Render
  //
  if (user === undefined) return <Loading />

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