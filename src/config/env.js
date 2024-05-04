const Joi = require('joi')
require('dotenv').config() // If using dotenv for loading .env file

class Config {
  constructor() {
    this.schema = Joi.object({
      NODE_ENV: Joi.string().required().valid('development', 'production'),
      PORT: Joi.number().default(8000),
      MONGO_URL: Joi.string().required(),
      MONGO_DB_NAME: Joi.string().required(),
      REDIS_URL: Joi.string().required(),

      KITE_API_KEY: Joi.string().required(),
      KITE_API_SECRET: Joi.string().required(),
    }).unknown(true) // Allow additional variables not defined in schema

    // Load and validate environment variables
    const { error, value: envVars } = this.schema.validate(process.env)
    if (error) {
      throw new Error(`Config validation error: ${error.message}`)
    }

    this.env = envVars.NODE_ENV
    // Set configuration properties
    this.port = envVars.PORT
    this.mongo_conn_url = `${envVars.MONGO_URL}/${envVars.MONGO_DB_NAME}`
    this.redis_url = envVars.REDIS_URL
    this.kite = {
      api_key: envVars.KITE_API_KEY,
      api_secret: envVars.KITE_API_SECRET,
    }
  }

  static getInstance() {
    if (!Config.instance) {
      Config.instance = new Config()
    }
    return Config.instance
  }
}

const config = Config.getInstance()
module.exports = config
module.exports.config = config
