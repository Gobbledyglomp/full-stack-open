const morgan = require('morgan')
const logger = require('./logger')

// Request logger
morgan.token('body', request => JSON.stringify(request.body))
const requestLogger = morgan('[HTTP] :method :url :status :res[content-length] - :response-time ms :body')

// Unknown endpoint
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// Error handler
const errorHandler = (error, request, response, next) => {
    logger.error('App', error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
        return response.status(400).json({ error: `'${error.keyValue.username}' already exists` })
    }

    next(error)
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}