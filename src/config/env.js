import Joi from 'joi';
import { config } from 'dotenv';

config();

const schema = Joi.object({
	NODE_ENV: Joi.string().required().valid('development', 'production'),
	PORT: Joi.number().default(8000),
	MONGO_URL: Joi.string().required(),
	MONGO_DB_NAME: Joi.string().required(),
	REDIS_URL: Joi.string().required(),

	KITE_API_KEY: Joi.string().required(),
	KITE_API_SECRET: Joi.string().required(),
	SESSION_SECRET: Joi.string().base64().required(),
	FRONTEND_URL: Joi.string().uri().required(),

	FYERS_APP_ID: Joi.string().required(),
	FYERS_SECRET_ID: Joi.string().required(),
	FYERS_REDIRECT_URL: Joi.string().uri().required(),

	INFLUXDB_HOST: Joi.string().uri().required(),
	INFLUXDB_TOKEN: Joi.string().required(),
}).unknown(true); // Allow additional variables not defined in schema

// Load and validate environment variables
const { error, value: envVars } = schema.validate(process.env);

if (error) {
	throw new Error(`Config validation error: ${error.message}`);
}

export const EN_VIR = {
	env: envVars.NODE_ENV,
	port: envVars.PORT,
	mongo_url: `${envVars.MONGO_URL}/${envVars.MONGO_DB_NAME}`,
	redis_url: envVars.REDIS_URL,
	session_secret: envVars.SESSION_SECRET,
	frontend_url: envVars.FRONTEND_URL,
	kite: {
		api_key: envVars.KITE_API_KEY,
		api_secret: envVars.KITE_API_SECRET,
	},
	fyer: {
		app_id: envVars.FYERS_APP_ID,
		secret_id: envVars.FYERS_SECRET_ID,
		redirect_url: envVars.FYERS_REDIRECT_URL,
	},
	influxdb: {
		host: envVars.INFLUXDB_HOST,
		token: envVars.INFLUXDB_TOKEN,
	},
};
