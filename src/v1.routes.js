import { fyersAuthHandlers } from './security/fyers-auth/fyers.auth.routes.js';

export const v1Routes = (fastify) => {
	// Adding v1 route handlers
	fastify.register(fyersAuthHandlers, { prefix: '/v1/api/fyers' });
};
