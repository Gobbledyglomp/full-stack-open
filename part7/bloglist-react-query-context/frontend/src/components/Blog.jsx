import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import blogService from '../services/blogs'
import useNotify from '../hooks/useNotify'
import { useLoginSession } from '../hooks/login'

const Blog = ({ blog }) => {
  const { loginSession } = useLoginSession()

  const [toggled, setToggled] = useState(false)

  const { notifyError } = useNotify()

  const queryClient = useQueryClient()

  // Mutations
  const likeMutation = useMutation({
    mutationFn: blogService.like,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)),
      )
    },
    onError: (error) => notifyError(error.message),
  })

  const deleteMutation = useMutation({
    mutationFn: async (blog) => {
      const canDelete = confirm(`Remove blog ${blog.title} by ${blog.author}?`)
      if (canDelete) {
        await blogService.deleteOne(blog)
        return blog
      }
      return null
    },
    onSuccess: (deletedBlog) => {
      if (deletedBlog !== null) {
        const blogs = queryClient.getQueryData(['blogs'])
        queryClient.setQueryData(
          ['blogs'],
          blogs.filter((blog) => blog.id !== deletedBlog.id),
        )
      }
    },
    onError: (error) => notifyError(error.message),
  })

  // Handlers
  const handleLike = (event) => {
    event.preventDefault()
    likeMutation.mutate(blog)
  }

  const handleDeletion = (event) => {
    event.preventDefault()
    deleteMutation.mutate(blog)
  }

  // Styles
  const blogStyle = {
    padding: '10px',
    border: '2px solid #0288d1',
    backgroundColor: '#eaf8ff',
    borderWidth: 1,
    marginBottom: 5,
    maxWidth: '500px',
  }
  const titleStyle = {
    display: 'flex',
  }
  const buttonStyle = {
    marginLeft: 'auto',
  }
  const deleteButtonStyle = {
    marginTop: '10px',
    display: blog.user.username === loginSession.username ? '' : 'none',
  }
  const descriptionStyle = {
    display: toggled ? '' : 'none',
    marginTop: '10px',
  }

  // Render
  return (
    <div style={blogStyle}>
      {/* Title */}
      <div style={titleStyle}>
        <div>
          <i>{blog.title}</i> &nbsp;by {blog.author}
        </div>
        {/* Button */}
        <div style={buttonStyle}>
          <button onClick={() => setToggled(!toggled)}>
            {toggled ? 'Hide' : 'View'}
          </button>
        </div>
      </div>
      {/* Description */}
      <div style={descriptionStyle}>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          Likes: {blog.likes}
          <button onClick={handleLike}>❤️</button>
        </div>
        <div>{blog.user.name}</div>
        {/* Button */}
        <div style={deleteButtonStyle}>
          <button onClick={handleDeletion}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default Blog
