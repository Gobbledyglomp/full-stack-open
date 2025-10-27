import { useState, useRef, useEffect } from 'react'

import Loading from './Loading'
import CreateBlogs from './CreateBlogs'
import Notification from './Notification'
import Togglable from './Togglable'
import BlogList from './BlogList'

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
        <div style={{ marginBottom: '20px' }}>
            {name} logged in. &nbsp;
            <button onClick={logout}>Logout</button>
        </div>
    )
}

const Blogs = ({ user }) => {
    // States
    const [blogs, setBlogs] = useState([])
    
    // Refs
    const notificationRef = useRef({ notify: null })

    // Effects
    useEffect(() => {
        blogService
            .getAll()
            .then(blogs => setBlogs(blogs))
    }, [])

    // Functions
    const notify = (type, text) => {
        if (notificationRef) {
            notificationRef.current.notify(type, text)
        }
    }
    const addBlog = blog => {
        setBlogs(blogs.concat(blog))
    }

    // Render
    return (
        <>
            <h1>Blogs</h1>
            <Notification ref={notificationRef} />
            <UserInfo name={user.name} />

            <Togglable label="test">
                <CreateBlogs addBlog={addBlog} notify={notify} />
            </Togglable>
            <BlogList
                blogs={blogs}
                setBlogs={setBlogs}
                currentUser={user}
                notify={notify}
            />
        </>
    )
}

export default Blogs