const { kiteconnect } = require('./../../config/kiteconnect')

class KiteAuthService {
  //   constructor() {}

  getLoginUrl() {
    return kiteconnect.getLoginURL()
  }
}

module.exports.KiteAuthService = KiteAuthService
