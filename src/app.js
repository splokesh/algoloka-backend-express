const express = require('express')
const compression = require('compression')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const logger = require('./config/logger')

const app = express()

// Apply middleware
app.use(compression())
app.use(helmet())
app.use(cors())
app.use(cookieParser())

app.use(
  morgan('tiny', {
    stream: { write: (message) => logger.info(message.trim()) },
  })
)

app.get('/', (req, res) => {
  res.send('Algoloka-backend')
})

module.exports = app
