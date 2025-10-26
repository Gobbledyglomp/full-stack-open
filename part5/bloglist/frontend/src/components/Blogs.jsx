import { useState, useEffect } from 'react'

import Loading from './Loading'
import CreateBlogs from './CreateBlogs'
import Notification from './Notification'

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
        <div>
            {name} logged in. &nbsp;
            <button onClick={logout}>Logout</button>
        </div>
    )
}

const Blog = ({ blog }) => (
    <div>
        <i>{blog.title}</i> by {blog.author}
    </div>  
)

const BlogList = ({ blogs }) => {
    if (!blogs) return <Loading />

    return (
        <div>
            {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </div>
    )
}

// Main export
const Blogs = ({ user }) => {
    // States
    const [blogs, setBlogs] = useState([])
    const [notification, setNotification] = useState({ type: null, text: null })
    
    // Effects
    useEffect(() => {
        blogService
            .getAll()
            .then(blogs => setBlogs(blogs))
    }, [])

    // Functions
    const addBlog = blog => {
        setBlogs(blogs.concat(blog))
    }
    const notify = (type, text) => {
        setNotification({ type, text})
        setTimeout(() => setNotification({ text: null }), 3000)
    }

    // Render
    return (
        <>
            <h1>Blogs</h1>
            <Notification notification={notification} />
            <UserInfo name={user.name} />            
            <CreateBlogs addBlog={addBlog} notify={notify} />
            <BlogList blogs={blogs} />
        </>
    )
}

export default Blogs