module.exports.calculateHeikenAshi = function calculateHeikenAshi(prices) {
	const heikenAshiCandles = [];

	for (let i = 0; i < prices.length; i++) {
		const current = prices[i];
		const prev = i > 0 ? heikenAshiCandles[i - 1] : null;

		const haClose =
			(current.open + current.high + current.low + current.close) / 4;
		const haOpen = prev
			? +Number((prev.open + prev.close) / 2).toFixed(2)
			: +Number((current.open + current.close) / 2).toFixed(2);
		const haHigh = Math.max(current.high, haOpen, haClose);
		const haLow = Math.min(current.low, haOpen, haClose);

		heikenAshiCandles.push({
			date: current.date,
			open: haOpen,
			high: haHigh,
			low: haLow,
			close: haClose,
		});
	}

	return heikenAshiCandles;
};

function updateHeikenAshi(currentPrice, previousHeikenAshi) {
	const haClose = +Number(
		(currentPrice.open +
			currentPrice.high +
			currentPrice.low +
			currentPrice.close) /
			4,
	).toFixed(2);
	const haOpen = (previousHeikenAshi.open + previousHeikenAshi.close) / 2;
	const haHigh = Math.max(currentPrice.high, haOpen, haClose);
	const haLow = Math.min(currentPrice.low, haOpen, haClose);

	return {
		open: haOpen,
		high: haHigh,
		low: haLow,
		close: haClose,
	};
}

// Example usage:
let previousHeikenAshi = {
	open: 0,
	high: 0,
	low: 0,
	close: 0,
};

const prices = [
	{ open: 10, high: 15, low: 8, close: 12 },
	{ open: 12, high: 16, low: 10, close: 14 },
	{ open: 14, high: 18, low: 12, close: 16 },
	// Add more price objects here...
];

const heikenAshiCandles = [];

prices.forEach((price) => {
	const currentHeikenAshi = updateHeikenAshi(price, previousHeikenAshi);
	heikenAshiCandles.push(currentHeikenAshi);
	previousHeikenAshi = currentHeikenAshi;
});

console.log(heikenAshiCandles);
