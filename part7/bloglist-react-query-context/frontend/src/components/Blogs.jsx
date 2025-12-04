import Notification from './Notification'
import UserInfo from './UserInfo'
import Togglable from './Togglable'
import CreateBlogs from './CreateBlogs'
import BlogList from './BlogList'

const Blogs = () => {
  return (
    <>
      <h1>Blogs</h1>
      <Notification />
      <UserInfo />

      <Togglable label="Create New Blog">
        <CreateBlogs />
      </Togglable>
      <BlogList />
    </>
  )
}

export default Blogs
