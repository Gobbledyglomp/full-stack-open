import { useQuery } from '@tanstack/react-query'

import Blog from './Blog'
import Loading from './Loading'

import blogService from '../services/blogs'

const BlogList = ({ setBlogs, currentUser }) => {
  // Query: blogs
  const queryResult = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
  })

  const blogs = queryResult.data

  // Functions
  const updateBlog = (updatedBlog) => {
    const updatedBlogs = blogs.map((blog) => {
      if (blog.id === updatedBlog.id) {
        return updatedBlog
      }
      return blog
    })
    setBlogs(updatedBlogs)
  }

  const deleteBlog = (deletedBlog) => {
    const updatedBlogs = blogs.filter((blog) => blog.id !== deletedBlog.id)
    setBlogs(updatedBlogs)
  }

  // Render
  if (queryResult.isError) return <div>Blogs service not available</div>

  if (queryResult.isLoading) return <Loading />

  return (
    <div className="bloglist">
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
            currentUser={currentUser}
          />
        ))}
    </div>
  )
}

export default BlogList
