const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()

const config = require('../utils/config')

const Blog = require('../models/blog')
const User = require('../models/user')

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
    const decodedToken = jwt.verify(request.token, config.SECRET)
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
    const blog = await Blog.findById(request.params.id)
    
    if (!blog) {
        return response.status(404).json({ error: `Blog ${request.params.id} was not found` })
    }

    for (const property in request.body) {
        blog[property] = request.body[property]
    }

    await blog.save()
    response.json(blog)
})

// DELETE
blogsRouter.delete('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, config.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({
            error: 'token invalid'
        })
    }
    
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
        return response.status(404).json({
            error: 'blog not found'
        })
    }    
    if (blog.user.toString() !== decodedToken.id) {
        return response.status(401).json({
            error: 'not authorized to delete blog'
        })
    }

    await Blog.findByIdAndDelete(request.params.id)    
    response.status(204).end()
})

module.exports = blogsRouter