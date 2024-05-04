const config = require('./config/env')

const app = require('./app')
const logger = require('./config/logger')

require('./config/redis')
require('./config/mongoose')

const port = config.port

logger.info(`-- Starting server -- ${Date.now()}`)

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`)
})
