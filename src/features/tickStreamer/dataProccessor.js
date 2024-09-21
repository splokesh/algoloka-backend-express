import { fyersModel } from 'fyers-api-v3';
import { EN_VIR } from '../../config/env.js';
import { redisClient } from '../../config/redis.js';
import { format, getTime, subDays } from 'date-fns';
import { influxClient } from '../../config/influx.js';
import { HeikenAshi } from '../../indicators/HeikenAshi.js';
import { EMA } from '../../indicators/EMA.js';
import { SuperTrend } from '../../indicators/SuperTrend.js';
import { logger } from '../../config/logger.js';
// cn - connection message
// sub - subscribe message
// if - index data message
// dp - market depth data message
// sf - Equity and option data message

export class DataProcessor {
	#fyersClient = null;
	timeFormat = 'dd/MM/yyyy HH:mm:ss XX';

	constructor({ appId, accessToken }) {
		this.appId = appId;
		this.accessToken = accessToken;
		this.#fyersClient = new fyersModel({
			AppID: appId,
			Version: 3,
			path: 'logs',
			LoggingFlag: EN_VIR.env === 'development',
		});
		this.#fyersClient.setAccessToken(accessToken);
		this.influxClient = influxClient;
		// console.log(influxClient);
		// this.writeApi = this.influxClient.getWriteApi(influxOrg, influxBucket);
		// this.queryApi = this.influxClient.getQueryApi(influxOrg);

		this.currentCandles = {};

		this.ema_9 = new EMA(9);
		this.ema_18 = new EMA(18);
		this.ema_90 = new EMA(90);
		this.superTrend = new SuperTrend(2, 1);

		this.heikenAshiIndicator = new HeikenAshi();
		this.haEMA_9 = new EMA(9);
		this.haEMA_18 = new EMA(18);
		this.haEMA_90 = new EMA(90);
		this.haSuperTrend = new SuperTrend(2, 1);
	}

	async processMessage(message) {
		if (!['if', 'sf'].includes(message?.type)) return;
		const { symbol, ltp, vol_traded_today, exch_feed_time, last_traded_time } =
			message;
		const timestamp = exch_feed_time || last_traded_time;
		const minute = Math.floor(timestamp / 60) * 60 * 1000;

		const candle =
			this.currentCandles[symbol] || this.createNewCandle(symbol, minute, ltp);

		if (candle.time !== minute) {
			await this.updateStockData(symbol, candle);
			this.currentCandles[symbol] = this.createNewCandle(symbol, minute, ltp);
		} else {
			this.updateCandle(candle, ltp, vol_traded_today);
		}
	}

	createNewCandle(symbol, minute, ltp) {
		return {
			symbol,
			time: minute,
			formatted: format(minute, this.timeFormat),
			open: ltp,
			high: ltp,
			low: ltp,
			close: ltp,
			volume: 0,
			is_real_time_data: true,
		};
	}

	updateCandle(candle, ltp, volume) {
		candle.high = Math.max(candle.high, ltp);
		candle.low = Math.min(candle.low, ltp);
		candle.close = ltp;
		if (volume !== undefined) {
			candle.volume = volume;
		}
	}

	async storeCandle(symbol, candle) {
		try {
			await this.influx.writePoints([
				{
					measurement: 'candles',
					tags: { symbol },
					fields: {
						open: candle.open,
						high: candle.high,
						low: candle.low,
						close: candle.close,
						volume: candle.volume,
					},
					timestamp: new Date(candle.minute * 1000),
				},
			]);
		} catch (err) {
			console.error(`Error saving candle for ${symbol}:`, err);
		}
	}

	async updateStockData(symbol, data) {
		// console.log(data);
		const key = `stock:${symbol}`;
		const maxLength = 400; // Set your desired max length

		try {
			await redisClient.lpush(key, JSON.stringify(data));
			await redisClient.ltrim(key, 0, maxLength - 1);
		} catch (err) {
			console.error(`Error updating Redis queue for ${symbol}:`, err);
		}
	}

	async getLatestData(symbol, count = 1) {
		const key = `stock:${symbol}`;
		try {
			const data = await redisClient.lrange(key, 0, count - 1);
			return data.map(JSON.parse);
		} catch (err) {
			console.error(`Error fetching data for ${symbol}:`, err);
			return [];
		}
	}

	async fetchHistoricalData(symbol, days = 100) {
		const endDate = format(new Date(), 'yyyy-MM-dd');
		const startDate = format(subDays(new Date(), 100), 'yyyy-MM-dd');
		console.log({ startDate, endDate });
		try {
			const { s, code, candles, message } = await this.#fyersClient.getHistory({
				symbol: symbol,
				resolution: '1',
				date_format: 1,
				range_from: startDate,
				range_to: endDate,
				cont_flag: 1,
			});

			if (s === 'ok') {
				console.log(candles.length);
				await this.getCandles(symbol, candles);
				return;
			}

			if (s === 'no_data') {
				await this.fetchHistoricalData(symbol, 3);
				return;
			}
			const err = new Error('Response of histroy failed');
			err.code = code;
			err.response = message;
			throw err;
		} catch (error) {
			console.error(error);
			logger.error(
				`Error fetching historical data for ${symbol}:`,
				error.message,
			);
			throw error;
		}
	}

	async getCandles(symbol, candles = []) {
		/**
		 * Example candle values - [ 1722311100, 81349.28, 81410.57, 81230.44, 81292.62, 0 ]
		 * 1.Current epoch time,
		 * 2. Open Value,
		 * 3.Highest Value
		 * 4.Lowest Value,
		 * 5.Close Value,
		 * 6.Total traded quantity (volume)
		 */

		const ohlc_data = candles.map(([time, open, high, low, close, volume]) => ({
			symbol,
			time: time * 1000,
			open,
			high,
			low,
			close,
			volume,
			formatted: format(time * 1000, this.timeFormat),
			is_real_time_data: false,
		}));

		await Promise.all(
			ohlc_data.map((candle) => this.computeIndicatorData(symbol, candle)),
		);
	}

	async computeIndicatorData(symbol, candle, store = true) {
		const ha = this.heikenAshiIndicator.compute(candle);

		const data = {
			...candle,
			ema_9: this.ema_9.compute(candle),
			ema_18: this.ema_18.compute(candle),
			ema_90: this.ema_90.compute(candle),
			supertrend: this.superTrend.compute(candle),
			ha: {
				...ha,
				ema_9: this.haEMA_9.compute(ha),
				ema_18: this.haEMA_18.compute(ha),
				ema_90: this.haEMA_90.compute(ha),
				supertrend: this.haSuperTrend.compute(ha),
			},
		};
		if (store) {
			await this.updateStockData(symbol, data);
		}
		return;
	}

	async subscribe(symbol) {
		await this.ensureHistoricalData(symbol);
		// Additional subscription logic here (e.g., adding to WebSocket subscription)
	}
}
