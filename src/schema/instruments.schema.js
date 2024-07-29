// const { Schema, model } = require('mongoose');
// const {
// 	BROKER,
// 	EXCHANGE,
// 	INSTRUMENT_TYPE,
// 	SEGMENT,
// } = require('../constants/broker.constants');

// const InstrumentSchema = new Schema(
// 	{
// 		instrument_token: { type: String, required: true },
// 		exchange_token: { type: String, required: true },
// 		tradingsymbol: { type: String, required: true },
// 		name: { type: String, required: true },
// 		broker: { type: String, required: true, enum: Object.values(BROKER) },
// 		last_price: { type: Number, required: true },
// 		strike: { type: Number, required: true }, // Only for Option?
// 		tick_size: { type: Number, required: true }, // Smallest movement to emit a price change event
// 		lot_size: { type: Number, required: true }, // Number of stocks per lot
// 		exchanges: { type: String, enum: Object.values(EXCHANGE) },
// 		instrument_type: { type: String, enum: Object.values(INSTRUMENT_TYPE) },
// 		segment: { type: String, enum: Object.values(SEGMENT) },
// 		expiry: { type: Date, required: true },
// 	},
// 	{ timestamps: true },
// );

// InstrumentSchema.index({
// 	instrument_token: 1,
// 	exchange_token: 1,
// 	broker: 1,
// 	instrument_type: 1,
// 	exchanges: 1,
// });

// const InstrumentModal = model('Instruments', InstrumentSchema);

// module.exports = { InstrumentModal };
