const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()

const config = require('../utils/config')

const Blog = require('../models/blog')
const User = require('../models/user')

// Functions
const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

//
// GET
//
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

//
// POST
//
blogsRouter.post('/', async (request, response) => {
    const decodedToken = jwt.verify(getTokenFrom(request), config.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({
            error: 'token invalid'
        })
    }

    const user = await User.findById(decodedToken.id)
    if (!user) {
        return response.status(400).json({
            error: 'UserId missing or not valid'
        })
    }

    const blog = new Blog({
        ...request.body,
        user: user._id
    })
    await blog.save()

    user.blogs = user.blogs.concat(blog._id)
    await user.save()

    response.status(201).json(blog)
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