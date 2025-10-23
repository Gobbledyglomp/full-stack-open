const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// GET
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

// POST
blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    const result = await blog.save()
    response.status(201).json(result)
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