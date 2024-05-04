const redis = require('redis')

const config = require('./env')
const logger = require('./logger')

class RedisConnection {
  constructor() {
    if (!RedisConnection.instance) {
      logger.info(`Redis Url - ${config.redis_url}`)
      this.client = redis.createClient({
        url: config.redis_url,
      })
      this.client.on('error', (err) => {
        logger.error('Redis client error:', err)
      })
      RedisConnection.instance = this
    }
    return RedisConnection.instance
  }

  getClient() {
    return this.client
  }
}

module.exports = new RedisConnection()
