const redis = require('redis');

const config = require('./env');
const logger = require('./logger');

logger.info(`Redis Url - ${config.redis_url}`);

const client = redis.createClient({
  url: config.redis_url,
  legacyMode: false,
});

client.on('error', (err) => {
  logger.error('Redis client error:', err);
});
client.on('reconnecting', () => {
  logger.info('Client is trying to reconnect to the server');
});
client.on('ready', () => {
  logger.info('Client is ready to use');
});

client.connect();

module.exports.redisClient = client;
