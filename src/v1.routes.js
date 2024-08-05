import { streamMngHandlers } from './features/streamManager/streamMng.routes.js';
import { fyersAuthHandlers } from './security/fyers-auth/fyers.auth.routes.js';

export const v1Routes = (fastify) => {
	// Adding v1 route handlers
	fastify.register(fyersAuthHandlers, { prefix: '/v1/api/fyers' });
	fastify.register(streamMngHandlers, { prefix: '/v1/api/fyers/ticker' });
};
