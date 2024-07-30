// const WebSocket = require('ws');
// const EventEmitter = require('events');
import EventEmitter from 'events';
import { fyersDataSocket } from 'fyers-api-v3';
import { logger } from '../../config/logger.js';

class WebSocketManager extends EventEmitter {
	constructor(token, logging = false) {
		super();
		this.subscriptions = new Set();
		console.log(token, logging);
		this.dataSocket = fyersDataSocket.getInstance(token, '', logging);
		this.dataSocket.autoreconnectflag = true;
		this.dataSocket.on('connect', () => {
			logger.info('Data socket connected');
			this.emit('connected');
		});

		this.dataSocket.on('message', function (message) {
			console.log(message);
		});

		this.dataSocket.on('error', function (message) {
			console.log('erroris', message);
		});

		this.dataSocket.on('close', function () {
			logger.info('Data socket closed');
			this.emit('disconnected');
		});
	}

	connect() {
		this.dataSocket.connect();
	}

	subscribe(instruments = []) {
		instruments.forEach((instrument) => {
			console.log(instrument);
			if (!this.subscriptions.has(instrument)) {
				this.dataSocket.subscribe([instrument]);
				this.subscriptions.add(instrument);
			} else {
				logger.info(`Subscription  ${instrument} already exists`);
			}
		});
		// this.dataSocket.on('message', function (message) {
		// 	console.log(message);
		// });
	}

	unsubscribe(instruments = []) {
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

export { WebSocketManager };
