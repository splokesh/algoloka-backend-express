import { Schema, model } from 'mongoose';

import { BROKER } from '../constants/broker.constants.js';

const UserProfileSchema = new Schema(
	{
		id: { type: String, required: true },
		user_type: { type: String, required: false },
		image: { type: String, required: false },
		broker: { type: String, required: true, enum: Object.values(BROKER) },
		email: { type: String, required: true },
		shortName: { type: String, required: true },
		name: { type: String, required: true },
		appId: { type: String, required: false },
		accessToken: { type: String, required: true },
		refreshToken: { type: String, required: true },
		loginTime: { type: Date, required: true },
		pan: { type: String, required: false },
		mobileNumber: { type: String, required: false },
		totp: { type: Boolean, required: false },
	},
	{ timestamps: true },
);

UserProfileSchema.index({ id: 1, broker: 1, appId: 1 });
UserProfileSchema.index({ email: 1 });

export const UserProfileModel = model('UserProfile', UserProfileSchema);
