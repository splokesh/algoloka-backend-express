import { fyersDataSocket } from 'fyers-api-v3';
import { logger } from '../../config/logger.js';
import { DataProcessor } from './dataproccessor.js';

export class SocketManager {
	// Singleton implementation
	static getInstance({ appId, accessToken, logging = false }) {
		logger.info(`SocketManager - getInstance`);
		if (!SocketManager.instance) {
			SocketManager.instance = new SocketManager({
				appId,
				accessToken,
				logging,
			});
		}
		return SocketManager.instance;
	}

	constructor({ appId, accessToken, logging = false }) {
		this.appId = appId;
		this.accessToken = accessToken;
		this.dataProcessor = new DataProcessor({ appId, accessToken });
		this.subscriptions = new Set();
		this.dataSocket = fyersDataSocket.getInstance(
			`${appId}:${accessToken}`,
			'logs',
			logging,
		);
		this.dataSocket.mode(this.dataSocket.LiteMode);
		this.dataSocket.autoreconnect();

		this.dataSocket.on('connect', () => {
			logger.info('Data socket connected');
		});

		this.dataSocket.on(
			'message',
			function (message) {
				// Need to connect Data Proccesor here
				if (!['if', 'sf'].includes(message?.type)) {
					console.log(message);
					return;
				}
				this.dataProcessor.processMessage(message);
			}.bind(this),
		);

		this.dataSocket.on('error', function (message) {
			// Need to Alert about the errors
			console.error('erroris', message);
		});

		this.dataSocket.on('close', function () {
			logger.info('Data socket closed');
		});
	}

	connect() {
		this.dataSocket.connect();
	}

	subscribe(instruments = []) {
		logger.info(`[SocketManager] subscribing to ${instruments.join(',')}`);
		instruments.forEach((instrument) => {
			if (!this.subscriptions.has(instrument)) {
				this.dataSocket.subscribe([instrument]);
				this.subscriptions.add(instrument);
				this.dataProcessor.fetchHistoricalData(instrument);
			} else {
				logger.info(`Subscription ${instrument} already exists`);
			}
		});
	}

	unsubscribe(instruments = []) {
		logger.info(`[SocketManager] unubscribing ${instruments.join(',')}`);

		instruments.forEach((instrument) => {
			if (this.subscriptions.has(instrument)) {
				this.dataSocket.unsubscribe([instrument]);
				this.subscriptions.delete(instrument);
			} else {
				logger.info(`Subscription ${instrument} doesn't exists`);
			}
		});
	}

	mode(mode = 'lite') {
		if (mode === 'lite') {
			this.dataSocket.mode(this.dataSocket.LiteMode);
		} else {
			this.dataSocket.mode(this.dataSocket.FullMode);
		}
	}

	close() {
		this.dataSocket.close();
	}
}
