import { useQuery } from '@tanstack/react-query'

import Blog from './Blog'
import Loading from './Loading'

import blogService from '../services/blogs'

const BlogList = () => {
  const queryResult = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
  })

  const blogs = queryResult.data

  // Render
  if (queryResult.isError) {
    return <div>Blogs service not available</div>
  }

  if (queryResult.isLoading) {
    return <Loading />
  }

  return (
    <div className="bloglist">
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  )
}

export default BlogList
