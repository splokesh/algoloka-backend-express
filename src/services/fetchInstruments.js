// const { AuthorizedKiteConnect } = require('../config/kiteconnect');
// const { BROKER } = require('../constants/broker.constants');
// const { InstrumentModal } = require('../schema/instruments.schema');

// async function fetchInstruments(userInfo) {
// 	const { broker, access_token, api_key } = userInfo;

// 	const kiteconnect = AuthorizedKiteConnect({ access_token, api_key });

// 	const instruments = await kiteconnect.getInstruments();

// 	const BATCH_SIZE = 50;
// 	const numberOfBatches = Math.ceil(instruments.length / 50);

// 	const bulkQueryArray = [];
// 	for (let index = 0; index <= numberOfBatches; index++) {
// 		const startIndex = index * BATCH_SIZE;
// 		const endIndex = startIndex + BATCH_SIZE;

// 		const bulkQuery = instruments
// 			.slice(startIndex, endIndex)
// 			.filter((inst) => !!inst.instrument_token)
// 			.map((inst) => {
// 				const instrument = { ...inst, broker: BROKER.ZERODHA };
// 				if (Number.isNaN(inst?.lot_size)) {
// 					instrument.lot_size = 0;
// 				}

// 				return {
// 					updateOne: {
// 						filter: { instrument_token: inst.instrument_token },
// 						update: {
// 							$set: instrument,
// 						},
// 						upsert: true,
// 					},
// 				};
// 			});

// 		if (bulkQuery.length) bulkQueryArray.push(bulkQuery);
// 	}

// 	await Promise.all(
// 		bulkQueryArray.map((bq) => {
// 			try {
// 				InstrumentModal.bulkWrite(bq);
// 			} catch (error) {
// 				console.log(bq);
// 				console.log(error);
// 			}
// 		}),
// 	);

// 	return 'DONE';
// }

// module.exports.fetchInstruments = fetchInstruments;
