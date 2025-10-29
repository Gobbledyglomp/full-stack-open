import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({
    blog,
    updateBlog,
    deleteBlog,
    currentUser,
    notify
}) => {
    // States
    const [toggled, setToggled] = useState(false)

    //
    // Styles
    //
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
    const deleteButtonStyle = {
        marginTop: '10px',
        display: blog.user.username === currentUser.username
            ? ''
            : 'none'
    }
    const descriptionStyle = {
        display: toggled ? '' : 'none',
        marginTop: '10px'
    }

    // Functions
    const toggle = () => {
        setToggled(!toggled)
    }

    //
    // Handlers
    //
    const handleLike = async event => {
        event.preventDefault()

        try {
            const response = await blogService.like(blog)
            updateBlog(response)
        } catch (error) {
            notify('error', error.response.data.error)
        }
    }

    const handleDeletion = async event => {
        event.preventDefault()

        try {
            const canDelete = confirm(`Remove blog ${blog.title} by ${blog.author}`)
            if (canDelete) {
                await blogService.deleteOne(blog)
                deleteBlog(blog)
            }
        } catch (error) {
            notify('error', error.response.data.error)
        }
    }

    //
    // Render
    //
    return (
        <div style={blogStyle}>
            {/* Title */}
            <div style={titleStyle}>
                <div>
                    <i>{blog.title}</i> &nbsp;by {blog.author}
                </div>
                {/* Button */}
                <div style={buttonStyle}>
                    <button onClick={toggle}>
                        {toggled ? 'Hide' : 'View'}
                    </button>
                </div>
            </div>
            {/* Description */}
            <div style={descriptionStyle}>
                <div>
                    <a href={blog.url}>
                        {blog.url}
                    </a>
                </div>
                <div>
                    Likes: {blog.likes}
                    <button onClick={handleLike}>❤️</button>
                </div>
                <div>
                    {blog.user.name}
                </div>
                {/* Button */}
                <div style={deleteButtonStyle}>
                    <button onClick={handleDeletion}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Blog