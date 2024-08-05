import { StreamMngService } from './streamMng.service.js';

export const subscribe = async (req, reply) => {
	const { instruments = [] } = req.body;
	new StreamMngService().subscribe(instruments);
	return reply.send('Subscribed instruments');
};

export const unsubscribe = async (req, reply) => {
	const { instruments = [] } = req.body;
	new StreamMngService().unsubscribe(instruments);

	return reply.send('Unsubscribed instruments');
};
