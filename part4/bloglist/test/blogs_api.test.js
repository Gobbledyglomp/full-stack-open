const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

describe('when there are initially some blogs saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
    })

    describe('GET', () => {
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
    })

    test('unique identifier property of blog is named id', async () => {
        const blogs = await helper.blogsInDb()

        blogs.forEach(blog => {
            assert.notStrictEqual(blog.id, undefined)
            assert.strictEqual(blog._id, undefined)
        })
    })

    describe('POST', () => {
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

            const addedBlog = blogsAfterAdding.find(blog => blog.title === newBlog.title)

            assert.notStrictEqual(addedBlog, undefined)
            assert.strictEqual(addedBlog.author, newBlog.author)
            assert.strictEqual(addedBlog.url, newBlog.url)
            assert.strictEqual(addedBlog.likes, newBlog.likes)
        })

        test('blog without like field gets a value of 0', async () => {
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

        test('blog without title field receives status code 400', async () => {
            const newBlog = {
                author: 'Edsger W. Dijkstra',
                url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
                likes: 12
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(400)
        })

        test('blog without url field receives status code 400', async () => {
            const newBlog = {
                title: 'Canonical string reduction',
                author: 'Edsger W. Dijkstra',
                likes: 12
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(400)
        })
    })

    describe('DELETE', () => {
        test('blog is deleted with status code 204', async () => {
            const initialBlogs = await helper.blogsInDb()
            const blogToDelete = initialBlogs[0]
            
            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204)
        })

        test('trying to delete nonexistent blog gives status code 404', async () => {
            const invalidId = await helper.randomId()

            await api
                .delete(`/api/blogs/${invalidId}`)
                .expect(404)
        })
    })
})

after(async () => {
    await mongoose.connection.close()
})