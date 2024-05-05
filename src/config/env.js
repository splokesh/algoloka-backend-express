const Joi = require('joi')
require('dotenv').config() // If using dotenv for loading .env file

const schema = Joi.object({
  NODE_ENV: Joi.string().required().valid('development', 'production'),
  PORT: Joi.number().default(8000),
  MONGO_URL: Joi.string().required(),
  MONGO_DB_NAME: Joi.string().required(),
  REDIS_URL: Joi.string().required(),

  KITE_API_KEY: Joi.string().required(),
  KITE_API_SECRET: Joi.string().required(),
  SESSION_SECRET: Joi.string().base64().required(),
}).unknown(true) // Allow additional variables not defined in schema

// Load and validate environment variables
const { error, value: envVars } = schema.validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongo_conn_url: `${envVars.MONGO_URL}/${envVars.MONGO_DB_NAME}`,
  redis_url: envVars.REDIS_URL,
  session_secret: envVars.SESSION_SECRET,
  kite: {
    api_key: envVars.KITE_API_KEY,
    api_secret: envVars.KITE_API_SECRET,
  },
}

module.exports = config
module.exports.config = config
