import winston from 'winston';
import { EN_VIR } from './env.js';

function getFormatter() {
	if (EN_VIR.env === 'production') {
		return winston.format.combine(winston.format.simple());
	} else {
		return winston.format.combine(
			winston.format.colorize(),
			winston.format.splat(),
			winston.format.simple(),
		);
	}
}

// Winston logger configuration
const logger = winston.createLogger({
	transports: [
		new winston.transports.Console(),
		// new winston.transports.File({ filename: 'combined.log' }), // Log to file
	],
	format: getFormatter(),
});

export { logger };
