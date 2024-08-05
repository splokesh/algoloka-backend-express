import { EN_VIR } from '../../config/env.js';
import { logger } from '../../config/logger.js';
import { redisClient } from '../../config/redis.js';
import { SocketManager } from './dataSocket.js';

// Only one data socket manger in instance
let dsm;

export const envokeDataSocket = async () => {
	try {
		let fyersAccount = await redisClient.get(`FYERS_ACCOUNT`);

		if (fyersAccount) {
			fyersAccount = JSON.parse(fyersAccount);
			dsm = SocketManager.getInstance({
				appId: fyersAccount.appId,
				accessToken: fyersAccount.accessToken,
				logging: !EN_VIR.isPROD,
			});
		} else {
			logger.warn(`FYERS_ACCOUNT not cached`);
		}

		if (dsm) {
			dsm.connect();
			dsm.subscribe(['BSE:SENSEX-INDEX']); // 'BSE:SENSEX2480281700PE'
		}
	} catch (error) {
		logger.error(error);
		throw error;
	}
};

export const getDSMInstance = () => dsm;
