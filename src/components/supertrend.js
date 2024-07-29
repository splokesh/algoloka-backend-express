function calculateSupertrend(high, low, close, period, multiplier) {
	let atrValues = [];
	let trValues = [];
	let supertrendValues = [];

	// Calculate true range (TR) and average true range (ATR)
	for (let i = 0; i < high.length; i++) {
		let tr = Math.max(
			high[i] - low[i],
			Math.abs(high[i] - close[i - 1]),
			Math.abs(low[i] - close[i - 1]),
		);
		trValues.push(tr);
		if (i >= period) {
			let atr =
				trValues
					.slice(i - period + 1, i + 1)
					.reduce((acc, val) => acc + val, 0) / period;
			atrValues.push(atr);
		}
	}

	// Calculate Supertrend
	for (let i = period; i < high.length; i++) {
		let upperBand =
			(high[i - 1] + low[i - 1]) / 2 + multiplier * atrValues[i - period];
		let lowerBand =
			(high[i - 1] + low[i - 1]) / 2 - multiplier * atrValues[i - period];
		let previousSupertrend = supertrendValues[i - period - 1] || 0;

		if (close[i] <= upperBand) {
			supertrendValues.push(Math.max(upperBand, previousSupertrend));
		} else {
			supertrendValues.push(Math.min(lowerBand, previousSupertrend));
		}
	}

	return supertrendValues;
}

// Example usage
const high = [50, 52, 54, 55, 53, 57, 56, 59, 58, 60];
const low = [48, 50, 52, 53, 50, 54, 53, 57, 55, 58];
const close = [49, 51, 53, 54, 51, 55, 54, 58, 56, 59];
const period = 7;
const multiplier = 3;

const supertrend = calculateSupertrend(high, low, close, period, multiplier);
console.log('Supertrend values:', supertrend);

// Rolling

function calculateSupertrend(
	high,
	low,
	close,
	prevSupertrend,
	_period,
	multiplier,
) {
	const tr = Math.max(
		high - low,
		Math.abs(high - close[close.length - 1]),
		Math.abs(low - close[close.length - 1]),
	);
	const atr = prevSupertrend === 0 ? tr : (prevSupertrend + tr) / 2;
	const upperBand = (high + low) / 2 + multiplier * atr;
	const lowerBand = (high + low) / 2 - multiplier * atr;
	const previousSupertrend = prevSupertrend || 0;

	if (close[close.length - 1] <= upperBand) {
		return Math.max(upperBand, previousSupertrend);
	} else {
		return Math.min(lowerBand, previousSupertrend);
	}
}

// Example usage
let high = 0;
let low = 0;
let close = [];
const period = 7;
const multiplier = 3;
let prevSupertrend = 0;

// Function to update Supertrend on new tick
function updateSupertrend(newHigh, newLow, newClose) {
	high = newHigh;
	low = newLow;
	close.push(newClose);
	if (close.length > period) {
		close.shift(); // Remove oldest close price if exceeding period
	}
	prevSupertrend = calculateSupertrend(
		high,
		low,
		close[close.length - 1],
		prevSupertrend,
		period,
		multiplier,
	);
	return prevSupertrend;
}

// Example usage
const newHigh = 60;
const newLow = 58;
const newClose = 59;

const newSupertrend = updateSupertrend(newHigh, newLow, newClose);
console.log('New Supertrend value:', newSupertrend);
