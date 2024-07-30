// Listener of Brokers's stock ticks

import { logger } from './config/logger.js';
import { redisClient } from './config/redis.js';
import { mongooseConnection } from './config/mongoose.js';
import { EN_VIR } from './config/env.js';
import { WebSocketManager } from './features/tickers/WebSocket.js';

const listen = async () => {
	try {
		let fyersAccount = await redisClient.get(`FYERS_ACCOUNT`);
		if (!fyersAccount) {
			throw new Error('No fyers account connected');
		}
		fyersAccount = JSON.parse(fyersAccount);
		// console.log(fyersAccount);

		const dsm = new WebSocketManager(
			`${fyersAccount.appId}:${fyersAccount.accessToken}`,
			EN_VIR.env === 'development',
		);
		dsm.connect();
		dsm.subscribe(['BSE:SENSEX-INDEX']);

		setTimeout(() => {
			dsm.subscribe(['BSE:SENSEX2480281700PE']);
		}, 5 * 1000);
		// setTimeout(() => {
		// 	dsm.unsubscribe(['BSE:SENSEX-INDEX']);
		// }, 6 * 1000);
		console.log('>>', dsm.subscriptions);
	} catch (err) {
		logger.error('Server error');
		logger.error(err);
		throw err;
	}
};

listen();

process.on('SIGTERM', () => {
	logger.warn('SIGTERM signal received: closing TICKER server');
	mongooseConnection.disconnect();
	redisClient.disconnect();
});
