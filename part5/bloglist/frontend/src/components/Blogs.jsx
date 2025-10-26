import Loading from "./Loading"

const UserInfo = ({ name }) => {
    if (!name) return <Loading />

    return (
        <p>
            {name} logged in.
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