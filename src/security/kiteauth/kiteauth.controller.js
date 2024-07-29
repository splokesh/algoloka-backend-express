// const config = require('../../config/env');
// const { KiteAuthService } = require('./kiteauth.service');

// module.exports.getKiteLoginUrl = async (req, res) => {
// 	const loginUrl = await new KiteAuthService().getLoginUrl();
// 	console.log(loginUrl);
// 	return res.json({
// 		url: loginUrl,
// 	});
// };

// module.exports.kiteAuthorize = async (req, res) => {
// 	const userProfile = await new KiteAuthService().authorize(req.query);

// 	console.log(req?.session);
// 	req.session.user = {
// 		user_id: userProfile.user_id,
// 		email: userProfile.email,
// 		broker: userProfile.broker,
// 	};
// 	await req?.session.save();

// 	return res.redirect(config.frontend_url + '/dashboard');
// };

// module.exports.kitePostback = async (req, res) => {
// 	console.log('--- Kite Postback ---');
// 	console.log('body', req.body);
// 	console.log('query', req.query);
// 	console.log('params', req.params);

// 	return res.send('OK');
// };
