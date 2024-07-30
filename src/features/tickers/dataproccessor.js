const axios = require('axios');
const moment = require('moment');

class DataProcessor {
	constructor(appId, accessToken) {
		// ... (previous constructor code)

		this.appId = appId;
		this.accessToken = accessToken;
		this.fyersApiUrl = 'https://api-t1.fyers.in/data/history';
	}

	// ... (previous methods)

	async ensureHistoricalData(symbol) {
		const candleCount = await this.getCandleCount(symbol);
		if (candleCount < 300) {
			await this.fetchAndStoreHistoricalData(symbol);
		}
	}

	async getCandleCount(symbol) {
		const result = await this.influx.query(`
      SELECT count(*) FROM candles
      WHERE symbol = ${Influx.escape.stringLit(symbol)}
      AND time > now() - 2d
    `);
		return result[0].count_open || 0;
	}

	async fetchAndStoreHistoricalData(symbol) {
		const endDate = moment().format('YYYY-MM-DD');
		const startDate = moment().subtract(2, 'days').format('YYYY-MM-DD');

		try {
			const response = await axios.get(this.fyersApiUrl, {
				params: {
					symbol: symbol,
					resolution: '1',
					date_format: '1',
					range_from: startDate,
					range_to: endDate,
					cont_flag: '1',
				},
				headers: {
					Authorization: `${this.appId}:${this.accessToken}`,
				},
			});

			if (response.data && response.data.candles) {
				const candles = response.data.candles.map((candle) => ({
					measurement: 'candles',
					tags: { symbol },
					fields: {
						open: candle[1],
						high: candle[2],
						low: candle[3],
						close: candle[4],
						volume: candle[5],
					},
					timestamp: new Date(candle[0] * 1000),
				}));

				await this.influx.writePoints(candles);
				console.log(
					`Stored ${candles.length} historical candles for ${symbol}`,
				);
			}
		} catch (error) {
			console.error(
				`Error fetching historical data for ${symbol}:`,
				error.message,
			);
		}
	}

	async subscribe(symbol) {
		await this.ensureHistoricalData(symbol);
		// Additional subscription logic here (e.g., adding to WebSocket subscription)
	}
}

// Usage
const dataProcessor = new DataProcessor('your_app_id', 'your_access_token');

// When subscribing to a new instrument
dataProcessor.subscribe('BSE:BANKEX2461451400PE').then(() => {
	console.log('Subscribed and ensured historical data');
});
