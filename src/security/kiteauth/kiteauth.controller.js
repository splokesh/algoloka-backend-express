const config = require('../../config/env')
const { KiteAuthService } = require('./kiteauth.service')

module.exports.getKiteLoginUrl = async (req, res) => {
  const loginUrl = await new KiteAuthService().getLoginUrl()
  console.log(loginUrl)
  return res.json({
    url: loginUrl,
  })
}

module.exports.kiteAuthorize = async (req, res) => {
  const userProfile = await new KiteAuthService().authorize(req.query)

  console.log(req?.session)
  req.session.user = {
    user_id: userProfile.user_id,
    email: userProfile.email,
    broker: userProfile.broker,
  }
  await req?.session.save()

  return res.redirect(config.frontend_url + '/dashboard')
}
