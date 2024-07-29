import fastify from './app.js';
import { EN_VIR } from './config/env.js';
import { logger } from './config/logger.js';
import { redisClient } from './config/redis.js';
import { mongooseConnection } from './config/mongoose.js';
import { v1Routes } from './v1.routes.js';

// v1Routes
v1Routes(fastify);

// New optionsObject signature
const start = async () => {
	try {
		await fastify.listen({
			port: EN_VIR.port,
		});
		const srv = fastify.server.address();
		logger.info(`Server listening on ${srv.address}:${srv.port}`);
	} catch (err) {
		logger.error('Server error');
		logger.error(err);
		throw err;
	}
};

start();

process.on('SIGTERM', () => {
	logger.warn('SIGTERM signal received: closing HTTP server');
	mongooseConnection.disconnect();
	redisClient.disconnect();
});
