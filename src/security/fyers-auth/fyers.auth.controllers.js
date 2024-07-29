import { EN_VIR } from './../../config/env.js';
import { FyersAuthService } from './fyers.auth.services.js';

const fyersAuth = new FyersAuthService();
export const loginUrl = async () => {
	const loginUrl = await fyersAuth.loginUrl();

	return {
		url: loginUrl,
	};
};

export const authorize = async (req, reply) => {
	console.log({ ...req.query });
	const userProfile = await fyersAuth.authorize(req.query);

	// console.log(req?.session);
	// req.session.user = {
	// 	user_id: userProfile.user_id,
	// 	email: userProfile.email,
	// 	broker: userProfile.broker,
	// };
	// await req?.session.save();
	return 'OK';

	// return reply.send('OK');

	// return reply.redirect(EN_VIR.frontend_url + '/dashboard');
};

export const postback = async (req, reply) => {
	console.log('--- Fyers Postback ---');
	console.log('body', req.body);
	console.log('query', req.query);
	console.log('params', req.params);

	return 'OK';
	// return reply.send('OK');
};
