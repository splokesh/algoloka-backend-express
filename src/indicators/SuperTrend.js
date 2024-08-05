import { LimitedQueue } from '../components/queue.js';

/**
 * Super-trend = (High + Low)/2 + (Multiplier) * (ATR)
 */
export class SuperTrend {
	#atrQueue;
	#superTrendQueue;
	#multiplier;

	/**
	 * @param {number} period - The number of periods for ATR calculation.
	 * @param {number} multiplier - The multiplier for the ATR value to compute SuperTrend.
	 */
	constructor(period, multiplier) {
		this.period = period;
		this.#multiplier = multiplier;
		this.#atrQueue = new LimitedQueue(period);
		this.#superTrendQueue = new LimitedQueue(1);
	}

	/**
	 * Calculate the ATR (Average True Range).
	 * @param {Object} ohlc - The new OHLC data point.
	 * @returns {number} - The calculated ATR.
	 */
	calculateATR(ohlc) {
		const { high, low, close } = ohlc;
		let tr;

		if (this.#atrQueue.getLength() === 0) {
			tr = high - low;
		} else {
			const prevClose = this.#atrQueue.getPrevious().close;
			tr = Math.max(
				high - low,
				Math.abs(high - prevClose),
				Math.abs(low - prevClose),
			);
		}

		this.#atrQueue.enqueue({ tr, close });

		if (this.#atrQueue.getLength() < this.period) {
			return null; // Not enough data to calculate ATR
		}

		const atr =
			this.#atrQueue.getElements().reduce((sum, elem) => sum + elem.tr, 0) /
			this.period;
		return atr;
	}

	/**
	 * Calculate SuperTrend for a new data point.
	 * @param {Object} ohlc - The new OHLC data point.
	 * @param {number} ohlc.open - The opening price.
	 * @param {number} ohlc.high - The highest price.
	 * @param {number} ohlc.low - The lowest price.
	 * @param {number} ohlc.close - The closing price.
	 * @returns {Object} - The updated SuperTrend value and trend { value: number, trend: 1 or 0 }.
	 */
	compute(ohlc) {
		const atr = this.calculateATR(ohlc);
		if (atr === null) {
			return null; // Not enough data to calculate SuperTrend
		}

		const { high, low, close } = ohlc;
		const basicUpperBand = (high + low) / 2 + this.#multiplier * atr;
		const basicLowerBand = (high + low) / 2 - this.#multiplier * atr;

		let superTrend, trend;

		if (this.#superTrendQueue.getLength() === 0) {
			superTrend = basicUpperBand;
			trend = close > superTrend ? 1 : 0;
		} else {
			const prevSuperTrendData = this.#superTrendQueue.getPrevious();
			const prevSuperTrend = prevSuperTrendData.value;
			const prevTrend = prevSuperTrendData.trend;

			const finalUpperBand =
				basicUpperBand < prevSuperTrend || close < prevSuperTrend
					? basicUpperBand
					: prevSuperTrend;
			const finalLowerBand =
				basicLowerBand > prevSuperTrend || close > prevSuperTrend
					? basicLowerBand
					: prevSuperTrend;

			trend =
				prevTrend === 1
					? close < finalUpperBand
						? 0
						: 1
					: close > finalLowerBand
						? 1
						: 0;
			superTrend = trend === 1 ? finalLowerBand : finalUpperBand;
		}

		const result = { value: superTrend, trend };
		this.#superTrendQueue.enqueue(result);
		return result;
	}

	/**
	 * Get the current SuperTrend data in the buffer array.
	 * @returns {Array} - The list of SuperTrend data points.
	 */
	getSuperTrendData() {
		return this.#superTrendQueue.getElements();
	}
}
