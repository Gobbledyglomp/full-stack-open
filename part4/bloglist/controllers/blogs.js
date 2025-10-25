const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// GET
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const id = request.params.id
    const blog = await Blog
        .findById(id)
        .populate('user', { username: 1, name: 1 })
    response.json(blog)
})

// POST
const getRandomUser = async () => {
    const users = await User.find({})
    const randomIndex = Math.floor(Math.random() * users.length)
    
    return users[randomIndex]
} 

blogsRouter.post('/', async (request, response) => {
    const randomUser = await getRandomUser()

    const blog = new Blog({
        ...request.body,
        user: randomUser._id
    })
    const blogResult = await blog.save()

    randomUser.blogs = randomUser.blogs.concat(blogResult._id)
    await randomUser.save()
    
    response.status(201).json(blogResult)
})

// PUT
blogsRouter.put('/:id', async (request, response) => {
    const blogToUpdate = await Blog.findById(request.params.id)
    
    if (!blogToUpdate) {
        return response.status(404).json({ error: `Blog ${request.params.id} was not found` })
    }

    for (const property in request.body) {
        blogToUpdate[property] = request.body[property]
    }

    const updatedBlog = await blogToUpdate.save()

    response.json(updatedBlog)
})

// DELETE
blogsRouter.delete('/:id', async (request, response) => {
    const result = await Blog.findByIdAndDelete(request.params.id)
    
    if (!result) {
        return response.status(404).end()
    }

    response.status(204).end()
})

module.exports = blogsRouter