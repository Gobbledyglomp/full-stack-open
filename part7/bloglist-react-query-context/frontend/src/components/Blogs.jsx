import Notification from './Notification'
import UserInfo from './UserInfo'
import Togglable from './Togglable'
import CreateBlogs from './CreateBlogs'
import BlogList from './BlogList'

const Blogs = ({ user }) => {
  return (
    <>
      <h1>Blogs</h1>
      <Notification />
      <UserInfo name={user.name} />

      <Togglable label="Create New Blog">
        <CreateBlogs />
      </Togglable>
      <BlogList currentUser={user} />
    </>
  )
}

export default Blogs
