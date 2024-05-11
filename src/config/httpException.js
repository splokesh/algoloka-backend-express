const httpStatus = require('http-status')

class HttpException extends Error {
  constructor(status = undefined, message) {
    this.status = status
    if (!this.status) {
      this.status = httpStatus.INTERNAL_SERVER_ERROR
    }
    if (
      config.env === 'production' &&
      this.status === httpStatus.INTERNAL_SERVER_ERROR
    ) {
      message = 'Internal Server Error'
    }
    super(message)
  }
}

module.exports.HttpException = HttpException
