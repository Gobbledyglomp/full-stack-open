const morgan = require('morgan')
const logger = require('./logger')

// Token extractor
const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    
    request.token = authorization && authorization.startsWith('Bearer ')
        ? authorization.replace('Bearer ', '')
        : null
        
    next()
}

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
    } else if (error.name ===  'JsonWebTokenError') {
        return response.status(401).json({ error: 'token invalid' })
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({
            error: 'token expired'
        })
    }

    next(error)
}

module.exports = {
    tokenExtractor,
    requestLogger,
    unknownEndpoint,
    errorHandler,
}