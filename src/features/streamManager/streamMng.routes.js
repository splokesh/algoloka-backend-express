import * as streamMngController from './streamMng.controller.js';

export function streamMngHandlers(fastify, opts, done) {
	fastify.post('/subscribe', streamMngController.subscribe);
	fastify.post('/unsubscribe', streamMngController.unsubscribe);

	done();
}
