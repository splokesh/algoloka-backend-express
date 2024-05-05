const { KiteConnect } = require('kiteconnect')
const config = require('./env')

const kiteconnect = new KiteConnect({
  api_key: config.kite.api_key,
})

module.exports.kiteconnect = kiteconnect
