// const { HttpException } = require('../../config/httpException');
// const { kiteconnect } = require('./../../config/kiteconnect');
// const { config } = require('./../../config/env');
// const { UserProfileModel } = require('./../../schema/users.schema');
// const { BROKER } = require('../../constants/broker.constants');
// const { redisClient } = require('../../config/redis');

// class KiteAuthService {
// 	//   constructor() {}

// 	async getLoginUrl() {
// 		return kiteconnect.getLoginURL();
// 	}

// 	async authorize({ type, action, status, request_token }) {
// 		if (type !== 'login' && action !== 'login') {
// 			// error
// 			throw new HttpException(
// 				'Not a login type of action',
// 				HttpStatus.BAD_REQUEST,
// 			);
// 		}

// 		if (status !== 'success') {
// 			throw new HttpException('Login not successful', HttpStatus.BAD_REQUEST);
// 		}

// 		const response = await kiteconnect.generateSession(
// 			request_token,
// 			config.kite.api_secret,
// 		);

// 		const createdProfile = await UserProfileModel.findOneAndUpdate(
// 			{ user_id: response.user_id, broker: BROKER.ZERODHA },
// 			{
// 				...response,
// 				broker: BROKER.ZERODHA,
// 			},
// 			{
// 				upsert: true,
// 				new: true,
// 			},
// 		);

// 		console.log(redisClient);
// 		await redisClient.set(
// 			`${BROKER.ZERODHA}:${response.user_id}`,
// 			JSON.stringify(createdProfile),
// 			{
// 				EX: 60 * 60 * 8, // Eight hours
// 			},
// 		);

// 		return createdProfile;
// 	}
// }

// module.exports.KiteAuthService = KiteAuthService;
