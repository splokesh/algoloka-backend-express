const { KiteConnect } = require('kiteconnect');
const config = require('./env');

const kiteconnect = new KiteConnect({
  api_key: config.kite.api_key,
});

const AuthorizedKiteConnect = () => {
  const kiteconnect = new KiteConnect({
    api_key: config.kite.api_key,
    access_token: '',
  });
  return kiteconnect;
};

module.exports.kiteconnect = kiteconnect;
module.exports.AuthorizedKiteConnect = AuthorizedKiteConnect;
