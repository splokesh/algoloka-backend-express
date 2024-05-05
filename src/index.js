const config = require('./config/env')

const app = require('./app')
const logger = require('./config/logger')
const httpStatus = require('http-status')

require('./config/redis')
require('./config/mongoose')

const port = config.port

logger.info(`-- Starting server -- ${Date.now()}`)

const server = app.listen(port, () => {
  logger.info(`Server is running on port ${port}`)
})

const healthcheck = {
  uptime: process.uptime(),
  message: 'OK',
  timestamp: Date.now(),
}

app.get('/health', (req, res) => {
  try {
    res.send(healthcheck)
  } catch (error) {
    healthcheck.message = error
    res.status(httpStatus.SERVICE_UNAVAILABLE).send(healthcheck)
  }
})

process.on('SIGTERM', () => {
  logger.error('SIGTERM signal received: closing HTTP server')
  server.close(() => {
    logger.info('HTTP server closed')
  })
})
