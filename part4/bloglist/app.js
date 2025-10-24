const mongoose = require('mongoose')
const express = require('express')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const config = require('./utils/config')

const blogsRouter = require('./controllers/blogs')
const usersRouter =  require('./controllers/users')

// Connecting to MongoDB
logger.info('Mongoose', 'Connecting to', config.MONGODB_URI)

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info('Mongoose', 'Connected to MongoDB Atlas')
    })
    .catch(error => {
        logger.error('Mongoose', 'Error connecting to MongoDB Atlas:', error.message)
    })

// App
const app = express()

// Middleware
app.use(express.json())

if (config.ENV !== 'test') {
    app.use(middleware.requestLogger)
}

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app