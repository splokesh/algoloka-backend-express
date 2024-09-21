// * EMA = (Closing Price x Smoothing Factor) + (Previous EMA x (1 – Smoothing Factor))

export class EMA {
	#prevEMA = null; // Only need to store the last EMA value
	#multiplier;

	/**
	 * @param {number} period - The number of periods to calculate the EMA.
	 */
	constructor(period, source = 'CLOSE') {
		this.period = period;
		this.source = source;
		this.#multiplier = 2 / (period + 1);
	}

	/**
	 * Calculate EMA for a new data point.
	 * @param {number} price - The new price data point.
	 * @returns {number} - The updated EMA.
	 */
	compute(olhc) {
		const price = olhc.close;
		if (!price) {
			throw new Error('No price from the soruce');
		}
		let ema;

		if (!this.#prevEMA) {
			// Initialize EMA with the first price
			ema = price;
		} else {
			ema = (price - this.prevEMA) * this.#multiplier + this.#prevEMA;
		}

		this.#prevEMA = ema;

		return ema;
	}
}
