const config = require('./config/env')

const app = require('./app')
const logger = require('./config/logger')
const httpStatus = require('http-status')
const session = require('express-session')
const MongoStore = require('connect-mongo')

require('./config/redis')
require('./config/mongoose')

const routerV1 = require('./v1.routes')

const port = config.port

logger.info(`-- Starting server -- ${Date.now()}`)

// Initialize express-session middleware
app.use(
  session({
    name: 'algoloka.sid',
    secret: config.session_secret,
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 8,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: config.mongo_conn_url,
    }),
  })
)

app.use('/v1/api', routerV1)
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
