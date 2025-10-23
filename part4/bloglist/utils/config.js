require('dotenv').config()

const PORT = process.env.PORT
const ENV = process.env.NODE_ENV

const MONGODB_URI = ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

module.exports = { PORT, ENV, MONGODB_URI }