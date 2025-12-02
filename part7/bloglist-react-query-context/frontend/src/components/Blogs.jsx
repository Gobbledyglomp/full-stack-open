import { useState, useEffect } from 'react'

import Loading from './Loading'
import CreateBlogs from './CreateBlogs'
import Notification from './Notification'
import Togglable from './Togglable'
import BlogList from './BlogList'

import blogService from '../services/blogs'

const UserInfo = ({ name }) => {
  // Functions
  const logout = () => {
    window.localStorage.removeItem('user')
    window.location.reload()
  }

  // Render
  if (!name) return <Loading />

  return (
    <div style={{ marginBottom: '20px' }}>
      {name} logged in. &nbsp;
      <button onClick={logout}>Logout</button>
    </div>
  )
}

const Blogs = ({ user }) => {
  // States
  const [blogs, setBlogs] = useState([])

  // Effects
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  // Functions
  const addBlog = async (blog) => {
    const response = await blogService.create({
      title: blog.title,
      author: blog.author,
      url: blog.url,
    })
    setBlogs(blogs.concat(response))
  }

  // Render
  return (
    <>
      <h1>Blogs</h1>
      <Notification />
      <UserInfo name={user.name} />

      <Togglable label="Create New Blog">
        <CreateBlogs addBlog={addBlog} />
      </Togglable>
      <BlogList blogs={blogs} setBlogs={setBlogs} currentUser={user} />
    </>
  )
}

export default Blogs
