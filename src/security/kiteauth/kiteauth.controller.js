const { KiteAuthService } = require('./kiteauth.service')

module.exports.getKiteLoginUrl = async (req, res) => {
  const loginUrl = new KiteAuthService().getLoginUrl()
  return res.json({
    url: loginUrl,
  })
}
