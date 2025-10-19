const mongoose = require('mongoose')
const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

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

// Starting app
app.listen(config.PORT, () => {
    logger.info('App', 'Server running on port', config.PORT)
})