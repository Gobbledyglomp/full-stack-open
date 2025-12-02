import Blog from './Blog'

const BlogList = ({ blogs, setBlogs, currentUser }) => {
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
  if (!blogs) return <Loading />

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
