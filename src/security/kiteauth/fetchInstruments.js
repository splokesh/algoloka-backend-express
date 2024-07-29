// const { AuthorizedKiteConnect } = require('../../config/kiteconnect');
// const { BROKER } = require('../../constants/broker.constants');
// const { InstrumentModal } = require('../../schema/instruments.schema');

// async function fetchInst() {
// 	const kiteconnect = AuthorizedKiteConnect();

// 	const [margins, instruments] = await Promise.all([
// 		kiteconnect.getMargins(),
// 		kiteconnect.getInstruments(),
// 	]);

// 	console.log(margins);
// 	const BATCH_SIZE = 50;
// 	const numberOfBatches = Math.ceil(instruments.length / 50);

// 	console.log(instruments.length, numberOfBatches);

// 	const bulkQueryArray = [];
// 	for (let index = 0; index <= numberOfBatches; index++) {
// 		const startIndex = index * BATCH_SIZE;
// 		const endIndex = startIndex + BATCH_SIZE;
// 		// console.log({ startIndex, endIndex })

// 		const bulkQuery = instruments
// 			.slice(startIndex, endIndex)
// 			.filter((inst) => !!inst.instrument_token)
// 			.map((inst) => {
// 				const instrument = { ...inst, broker: BROKER.ZERODHA };
// 				// console.log(instrument)
// 				if (Number.isNaN(inst?.lot_size)) {
// 					console.log(instrument);
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
// }

// fetchInst().catch((e) => console.log(e));
