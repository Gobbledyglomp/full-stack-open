import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import useNotify from '../hooks/useNotify'
import blogService from '../services/blogs'

const CreateBlogs = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const { notifyInfo, notifyError } = useNotify()

  const queryClient = useQueryClient()

  const addBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
      notifyInfo(`New blog "${title}" by ${author} added`)
      setTitle('')
      setAuthor('')
      setUrl('')
    },
    onError: (error) => notifyError(error.message),
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    addBlogMutation.mutate({ title, author, url })
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Author:
            <input
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            URL:
            <input
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  )
}

export default CreateBlogs
