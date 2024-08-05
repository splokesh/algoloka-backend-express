import morgan from 'morgan';
import Fastify from 'fastify';
import httpStatus from 'http-status';
import { logger } from './config/logger.js';
import { EN_VIR } from './config/env.js';

const fastify = Fastify({
	logger: !EN_VIR.isPROD,
});

const morganMiddleware = morgan('tiny', {
	stream: {
		write: (message) => logger.info(message.trim()),
	},
});

(async () => {
	await fastify.addHook('preHandler', (request, reply, done) => {
		morganMiddleware(request.raw, reply.raw, done);
	});
	await Promise.all([
		fastify.register(import('@fastify/cors'), {}),
		fastify.register(import('@fastify/helmet'), {}),
		fastify.register(import('@fastify/compress'), { global: false }),
		fastify.register(import('@fastify/rate-limit'), {
			max: 100,
			timeWindow: '1 minute',
		}),
	]);
})()
	.then(() => {
		logger.info('Fastify Middlewares registered');
	})
	.catch((e) => {
		logger.error(e);
		throw e;
	});

fastify.get('/', (req, reply) => {
	reply.send('Algoloka-backend');
});

const healthcheck = {
	uptime: process.uptime(),
	message: 'OK',
	timestamp: Date.now(),
};

fastify.get('/health', (req, reply) => {
	try {
		reply.send(healthcheck);
	} catch (error) {
		healthcheck.message = error?.message;
		reply.status(httpStatus.SERVICE_UNAVAILABLE).send(healthcheck);
	}
});

export default fastify;
