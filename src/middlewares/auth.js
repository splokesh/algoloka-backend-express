// const httpStatus = require('http-status');
// const { config } = require('../config/env');
// const logger = require('../config/logger');
// const { redisClient } = require('../config/redis');
// const { UserProfileModel } = require('../schema/users.schema');

// const authMiddleware = async (req, res, next) => {
// 	// Check if user is authenticated
// 	if (!req.session || !req.session.user) {
// 		// If user is not authenticated, remove session and redirect to login page
// 		req.session.destroy((err) => {
// 			if (err) {
// 				logger.error('Error destroying session:' + err);
// 			}
// 			return res.redirect(config.frontend_url + '/');
// 		});
// 	} else {
// 		const { user_id, broker } = req.session.user;
// 		const userInfo = JSON.parse(await redisClient.get(`${broker}:${user_id}`));
// 		if (userInfo) {
// 			req.user = userInfo;
// 			return next();
// 		} else {
// 			const userProfile = await UserProfileModel.findOne({
// 				broker,
// 				user_id,
// 			}).lean();

// 			if (userProfile) {
// 				req.user = userProfile;
// 				await redisClient.set(
// 					`${broker}:${user_id}`,
// 					JSON.stringify(userProfile),
// 					{
// 						EX: 60 * 60 * 8, // Eight hours
// 					},
// 				);
// 				return next();
// 			} else {
// 				throw new HttpException(httpStatus.FORBIDDEN, 'Invalid user');
// 			}
// 		}
// 	}
// };

// module.exports.auth = authMiddleware;
