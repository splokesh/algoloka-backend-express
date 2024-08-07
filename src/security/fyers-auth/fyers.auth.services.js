import { fyersModel as FyersModel } from 'fyers-api-v3';
import { EN_VIR } from '../../config/env.js';
import { UserProfileModel } from '../../schema/users.schema.js';
import { BROKER } from '../../constants/broker.constants.js';
import { redisClient } from '../../config/redis.js';
import { envokeDataSocket } from '../../features/tickStreamer/envokeSocket.js';

export class FyersAuthService {
	#fyersClient = null;
	constructor() {
		this.#fyersClient = new FyersModel({
			AppID: EN_VIR.fyer.app_id,
			RedirectURL: EN_VIR.fyer.redirect_url,
			Version: 3,
			LogPath: 'log',
			LoggingFlag: !EN_VIR.isPROD,
		});
	}

	async loginUrl() {
		return this.#fyersClient.generateAuthCode();
	}

	async authorize({ auth_code }) {
		try {
			const response = await this.#fyersClient.generate_access_token({
				secret_key: EN_VIR.fyer.secret_id,
				auth_code,
			});
			const { access_token, refresh_token } = response;

			this.#fyersClient.setAccessToken(access_token);
			const { data: profile } = await this.#fyersClient.get_profile();
			console.log(profile);
			const createdProfile = await UserProfileModel.findOneAndUpdate(
				{ id: profile.fy_id, broker: BROKER.FYERS },
				{
					id: profile.fy_id,
					image: profile.image,
					broker: BROKER.FYERS,
					email: profile.email_id,
					shortName: profile.display_name,
					name: profile.name,
					appId: EN_VIR.fyer.app_id,
					accessToken: access_token,
					refreshToken: refresh_token,
					loginTime: new Date(),
					pan: profile.PAN,
					mobileNumber: profile.mobile_number,
					totp: profile.totp,
				},
				{
					upsert: true,
					new: true,
				},
			).lean();

			await redisClient.set(`FYERS_ACCOUNT`, JSON.stringify(createdProfile));
			await redisClient.expire(`FYERS_ACCOUNT`, 60 * 60 * 8);
			envokeDataSocket();

			console.log(createdProfile);
			delete createdProfile.pan;
			delete createdProfile.accessToken;
			delete createdProfile.refreshToken;
			delete createdProfile.appId;

			return createdProfile;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
