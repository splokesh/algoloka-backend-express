// const { logger } = require('../config/logger');
// const httpStatus = require('http-status');
// const config = require('./env');

// const asyncHandler = (controller) => {
// 	return async (req, res, next) => {
// 		try {
// 			return await controller(req, res, next);
// 		} catch (error) {
// 			if (config.env === 'development') {
// 				console.log(error);
// 			}
// 			logger.error(error);
// 			logger.error(`API Error - ${error}`);

// 			return res
// 				.status(
// 					httpStatus[error?.status]
// 						? error?.status
// 						: httpStatus.INTERNAL_SERVER_ERROR,
// 				)
// 				.json({ error: error?.message });
// 		}
// 	};
// };

// module.exports.catchAsync = asyncHandler;
