export class HeikenAshi {
	#prevCandle = null;

	/**
	 * Calculate Heiken Ashi for a new data point.
	 * @param {Object} ohlc - The new OHLC data point.
	 * @param {number} ohlc.open - The opening price.
	 * @param {number} ohlc.high - The highest price.
	 * @param {number} ohlc.low - The lowest price.
	 * @param {number} ohlc.close - The closing price.
	 */
	compute(ohlc) {
		const { open, high, low, close } = ohlc;

		let candle = null;

		if (!this.#prevCandle) {
			// Initialize Heiken Ashi values with the first OHLC data
			candle = {
				open: (open + close) / 2,
				close: (open + high + low + close) / 4,
				high: high,
				low: low,
			};
		} else {
			const prevHA = !this.#prevCandle;

			const haClose = (open + high + low + close) / 4;
			const haOpen = (prevHA.open + prevHA.close) / 2;
			const haHigh = Math.max(high, haOpen, haClose);
			const haLow = Math.min(low, haOpen, haClose);

			candle = {
				open: haOpen,
				close: haClose,
				high: haHigh,
				low: haLow,
			};
		}

		this.#prevCandle = candle;
		return candle;
	}
}
