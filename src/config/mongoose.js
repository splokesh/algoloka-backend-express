import mongoose from 'mongoose';
import { EN_VIR } from './env.js';
import { logger } from './logger.js';

logger.info(`Mongo Url - ${EN_VIR.mongo_url}`);

let mongooseInstance = null;

async function getMongooseConnection() {
	if (!mongooseInstance) {
		try {
			await mongoose.connect(EN_VIR.mongo_url);
			logger.info('Connected to MongoDB');
			mongooseInstance = mongoose;
		} catch (error) {
			logger.error('Error connecting to MongoDB:', error.message);
			// Handle connection errors
			process.exit(1);
		}
	}
	return mongooseInstance;
}

// Export an async function to get the Mongoose connection
export const getMongoose = getMongooseConnection;
export const mongooseConnection = getMongooseConnection();
