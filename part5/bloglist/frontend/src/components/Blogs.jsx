import Loading from "./Loading"

const UserInfo = ({ name }) => {
    // Functions
    const logout = () => {
        window.localStorage.removeItem('user')
        window.location.reload()
    }

    // Render
    if (!name) return <Loading />

    return (
        <p>
            {name} logged in &nbsp;
            <button onClick={logout}>Logout</button>
        </p>
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
        blogs.map(blog => <Blog key={blog.id} blog={blog} />)
    )
}

// Main export
const Blogs = ({ blogs, user }) => {
    return (
        <>
            <h1>Blogs</h1>
            <UserInfo name={user.name} />
            <BlogList blogs={blogs} />
        </>
    )
}

export default Blogs