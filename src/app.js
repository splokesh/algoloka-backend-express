const express = require('express')
const compression = require('compression')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')

const logger = require('./config/logger')
const routerV1 = require('./v1.routes')

const app = express()

// Apply middleware
app.use(compression())
app.use(helmet())
app.use(cors())

app.use(
  morgan('tiny', {
    stream: { write: (message) => logger.info(message.trim()) },
  })
)

app.get('/', (req, res) => {
  res.send('Algoloka-backend')
})

app.use('/v1/api', routerV1)

module.exports = app
