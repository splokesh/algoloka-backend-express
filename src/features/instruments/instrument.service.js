const { InstrumentModal } = require('../../schema/instruments.schema');

class Instrument {
	// constructor() {}

	async getList({ broker }) {
		// { page = 0, search = '', filter = [] }
		return await InstrumentModal.aggregate([
			{
				broker,
			},
			{
				$limit: 100,
			},
		]);
	}

	getInstrument() {}
}

module.exports.Instrument = Instrument;
