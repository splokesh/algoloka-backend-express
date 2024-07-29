const { NFO } = require('../../constants/index.constants');

const CHART_INDEX = 'NIFTY';

const getHistoricalData = async ({
	instrument_token,
	interval = INTERVALS.min_5,
	from_date = null,
	to_date = null,
}) => {
	const kiteconnect = AuthorizedKiteConnect();
	//   const params = { instrument_token, interval }
	//   if (from_date) params.from_date = from_date
	//   if (to_date) params.to_date = to_date

	console.log(instrument_token, interval, from_date, to_date);
	const data = await kiteconnect.getHistoricalData(
		instrument_token,
		interval,
		from_date,
		to_date,
	);

	const heikenAshi = calculateHeikenAshi(...[data]);
	console.log(heikenAshi);
};

const getChartData = ({ broker, user_id }) => {};

getChartData().catch((e) => console.log(e));
