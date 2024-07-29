const { fetchInstruments } = require('../../services/fetchInstruments');
const { Instrument } = require('./instrument.service');

module.exports.syncInstruments = async (req, res) => {
	console.log(req.user);
	await fetchInstruments(req.user);
	res.json({
		message: 'Sync instruments successful',
		data: null,
	});
};

module.exports.getInstrumentsList = async (req, res) => {
	// With Filter and Pagination and search
	const { user, query } = req;
	const { page = 0, filter = [] } = query;

	const results = await new Instrument().getList();

	return res.json({
		message: 'Instrument List',
		data: results,
	});
};

module.exports.getInstrument = async () => {
	// Full details
};

module.exports.updateInstrument = async () => {
	// Update single
};
