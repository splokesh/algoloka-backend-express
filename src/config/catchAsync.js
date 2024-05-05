const { logger } = require('../config/logger')
const { config } = require('../config/env')
const httpStatus = require('http-status')

const asyncHandler = (controller) => {
  return async (req, res, next) => {
    try {
      return await controller(req, res, next)
    } catch (error) {
      logger.error(`API Error - ${err}`)

      if (config.env === 'developement') {
        return res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .json({ error: error })
      }
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error' })
    }
  }
}

module.exports.catchAsync = asyncHandler
