function calculateEMA(prices, period) {
    const multiplier = 2 / (period + 1);
    const emaValues = [];

    // Calculate initial SMA as the first value
    let sum = 0;
    for (let i = 0; i < period; i++) {
        sum += prices[i];
    }
    const initialSMA = sum / period;
    emaValues.push(initialSMA);

    // Calculate EMA for subsequent values
    for (let i = period; i < prices.length; i++) {
        const ema = (prices[i] - emaValues[i - period]) * multiplier + emaValues[i - period];
        emaValues.push(ema);
    }

    return emaValues;
}

function calculateDema(prices, period) {
    const firstEMA = calculateEMA(prices, period);
    const secondEMA = calculateEMA(firstEMA, period);

    const demaValues = [];
    for (let i = 0; i < prices.length - period + 1; i++) {
        const dema = 2 * firstEMA[i] - secondEMA[i];
        demaValues.push(dema);
    }

    return demaValues;
}

// Example usage:
const prices = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28];
const period = 3;
const dema = calculateDema(prices, period);
console.log(dema);
