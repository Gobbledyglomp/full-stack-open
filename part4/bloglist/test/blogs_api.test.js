const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const app = require('../app')
const helper = require('./test_helper.test')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
})

test('all blogs are returned as json', async () => {
    const response = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('unique identifier property of blog is named id', async () => {
    const blogs = await helper.blogsInDb()

    blogs.forEach(blog => {
        assert.notStrictEqual(blog.id, undefined)
        assert.strictEqual(blog._id, undefined)
    })
})

test('valid blog is added', async () => {
    const newBlog = {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAfterAdding = await helper.blogsInDb()
    assert.strictEqual(blogsAfterAdding.length, helper.initialBlogs.length + 1)

    const titles = blogsAfterAdding.map(blog => blog.title)
    const authors = blogsAfterAdding.map(blog => blog.author)

    assert(titles.includes(newBlog.title))
    assert(authors.includes(newBlog.author))
})

test('blog without the like field gets a value of 0', async () => {
    const newBlog = {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAfterAdding = await helper.blogsInDb()
    const addedBlog = blogsAfterAdding.find(blog =>
        blog.title === newBlog.title && blog.author === newBlog.author)

    assert.strictEqual(addedBlog.likes, 0)
})

after(async () => {
    await mongoose.connection.close()
})