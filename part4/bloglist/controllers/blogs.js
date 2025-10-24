const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// GET
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const id = request.params.id
    const blog = await Blog.findById(id)
    response.json(blog)
})

// POST
blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    const result = await blog.save()
    response.status(201).json(result)
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