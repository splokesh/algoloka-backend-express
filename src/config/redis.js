import Redis from 'ioredis';
import { EN_VIR } from './env.js';
import { logger } from './logger.js';

logger.info(`Redis Url - ${EN_VIR.redis_url}`);

let redisClientInstance = null;

function getRedisClient() {
	if (!redisClientInstance) {
		redisClientInstance = new Redis(EN_VIR.redis_url);

		redisClientInstance.on('error', (err) => {
			logger.error('Redis client error:', err);
		});

		redisClientInstance.on('reconnecting', () => {
			logger.info('Redis client is trying to reconnect to the server');
		});

		redisClientInstance.on('ready', () => {
			logger.info('Redis client is ready to use');
		});
	}

	return redisClientInstance;
}

export const redisClient = getRedisClient();
