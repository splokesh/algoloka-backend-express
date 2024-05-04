const mongoose = require('mongoose')

const config = require('./env')
const logger = require('./logger')

// MongoDB connection URL
const MONGODB_URI = config.mongo_conn_url

logger.info(`Mongo Url - ${MONGODB_URI}`)
// Create a Mongoose connection
const db = mongoose.createConnection(MONGODB_URI)

// Event handlers for Mongoose connection
db.on('error', (err) => {
  logger.error(`MongoDB connection error: ${err?.name}`)
  logger.error(`MongoDB connection error: ${err?.stack}`)
})

db.once('open', () => {
  logger.info('Connected to MongoDB database')
})

module.exports = db
