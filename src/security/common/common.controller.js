// module.exports.logout = async (req, res) => {
// 	await req.session.destroy();

// 	return res.redirect(config.frontend_url + '/');
// };

// module.exports.test = async (req, res) => {
// 	if (req.user) {
// 		return res.json({
// 			message: 'Algoloka Backend V1 - User Logged in',
// 			data: { name: req.user.user_name },
// 		});
// 	}

// 	return res.json({
// 		message: 'Algoloka Backend V1 - User not loggerd in',
// 		data: null,
// 	});
// };

// module.exports.userInfo = async (req, res) => {
// 	const userInfo = {
// 		...req.user,
// 	};

// 	delete userInfo.api_key;
// 	delete userInfo.access_token;
// 	delete userInfo.public_token;
// 	delete userInfo.enctoken;
// 	delete userInfo.refresh_token;

// 	return res.json({
// 		message: 'User info',
// 		data: userInfo,
// 	});
// };
