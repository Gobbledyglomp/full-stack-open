import { useState } from 'react'

const Blog = ({ blog }) => {
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
                <button onClick={() => {}}>❤️</button><br />
                {blog.user.name}
            </div>
        </div>  
    )
}

const BlogList = ({ blogs }) => {
    if (!blogs) return <Loading />

    return (
        <div>
            {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </div>
    )
}

export default BlogList