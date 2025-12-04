import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'

import Notification from './Notification'
import UserInfo from './UserInfo'
import Togglable from './Togglable'
import CreateBlogs from './CreateBlogs'
import BlogList from './BlogList'

import blogService from '../services/blogs'

const Blogs = ({ user }) => {
  const queryClient = useQueryClient()

  // TO DELETE
  // Query: blogs
  const queryResult = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
  })
  const blogs = queryResult.data
  console.log(blogs)

  // TO DELETE
  // Mutations
  const addBlogLocally = useMutation({
    mutationFn: (newBlog) => {
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
    },
  })
  const setBlogs = (newBlog) => addBlogLocally.mutate(newBlog)

  // Render
  return (
    <>
      <h1>Blogs</h1>
      <Notification />
      <UserInfo name={user.name} />

      <Togglable label="Create New Blog">
        <CreateBlogs />
      </Togglable>
      <BlogList setBlogs={setBlogs} currentUser={user} />
    </>
  )
}

export default Blogs
