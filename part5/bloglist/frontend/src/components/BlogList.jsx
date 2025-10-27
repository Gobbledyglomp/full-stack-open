import { useState } from 'react'

import blogService from '../services/blogs'

const Blog = ({ blog, updateBlog, notify }) => {
    // States
    const [toggled, setToggled] = useState(false)

    // Styles
    const blogStyle = {
        padding: '10px', 
        border: '2px solid #0288d1',
        backgroundColor: '#eaf8ff',
        borderWidth: 1,
        marginBottom: 5,
        maxWidth: '500px'
    }
    const titleStyle = {
        display: 'flex'
    }
    const buttonStyle = {
        marginLeft: 'auto'
    }
    const descriptionStyle = {
        display: toggled ? '' : 'none',
        marginTop: '10px'
    }
    
    // Functions
    const toggle = () => {
        setToggled(!toggled)
    }

    // Handlers
    const handleLike = async event => {
        event.preventDefault()

        try {
            const response = await blogService.like(blog)
            updateBlog(response)
        } catch (error) {
            notify('error', error.response.data.error)
        }        
    }

    // Render
    return (
        <div style={blogStyle}>
            <div style={titleStyle}>
                <i>{blog.title}</i> &nbsp;by {blog.author}
                <button onClick={toggle} style={buttonStyle}>
                    {toggled ? 'Hide' : 'View'}
                </button>
            </div>
            <div style={descriptionStyle}>
                <a href={blog.url}>
                    {blog.url}
                </a><br />                
                Likes: {blog.likes}&nbsp;
                <button onClick={handleLike}>❤️</button><br />
                {blog.user.name}
            </div>
        </div>  
    )
}

const BlogList = ({ blogs, setBlogs, notify }) => {
    const updateBlog = updatedBlog => {
        const updatedBlogs = blogs.map(blog => {
            if (blog.id === updatedBlog.id) {
                return updatedBlog
            }

            return blog
        })

        setBlogs(updatedBlogs)
    }

    // Render
    if (!blogs) return <Loading />

    return (
        <div>
            {blogs
                .sort((a, b) => b.likes - a.likes)
                .map(blog => <Blog
                    key={blog.id}
                    blog={blog}
                    updateBlog={updateBlog}
                    notify={notify}
                />)
            }
        </div>
    )
}

export default BlogList