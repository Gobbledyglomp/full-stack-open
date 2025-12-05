import { useState, useEffect } from 'react'

import CreateBlogs from './CreateBlogs'
import Notification from './Notification'
import Togglable from './Togglable'
import BlogList from './BlogList'
import UserInfo from './UserInfo'

import blogService from '../services/blogs'

const Blogs = ({ user }) => {
  const [blogs, setBlogs] = useState([])

  // Effects
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

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
