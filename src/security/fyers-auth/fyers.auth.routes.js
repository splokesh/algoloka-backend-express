import * as fyersController from './fyers.auth.controllers.js';

export function fyersAuthHandlers(fastify, opts, done) {
	fastify.get('/login-url', fyersController.loginUrl);
	fastify.get('/authorize', fyersController.authorize);
	fastify.post('/postback', fyersController.postback);

	done();
}
