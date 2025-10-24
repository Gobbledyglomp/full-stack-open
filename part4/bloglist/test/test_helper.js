const Blog = require('../models/blog')
const User = require('../models/user')

//
// Blogs
//
const initialBlogs = [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5
    },
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const blogById = async id => {
    const blog = await Blog.findById(id)
    return blog.toJSON()
}

//
// Users
//
const initialUsers = [
    {
        username: 'root',
        name: 'root',
        password: 'root',
    },
    {
        username: 'new',
        name: 'New User',
        password: 'password',
    },
]

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const userById = async id => {
    const user = await User.findById(id)
    return user.toJSON()
}

//
// Misc
//
const randomId = async () => {
    const blog = new Blog({
        'title': 'TO BE DELETED',
        'author': 'TO BE DELETED',
        'url': 'TO BE DELETED',
    })

    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

module.exports = {
    initialBlogs,
    blogsInDb,
    blogById,
    initialUsers,
    usersInDb,
    userById,
    randomId,
}