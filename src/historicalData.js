const { format } = require('date-fns')
const { AuthorizedKiteConnect } = require('./config/kiteconnect')
const { INTERVALS } = require('./constants/chart.constants')
const { calculateHeikenAshi } = require('./components/heikenAshi')

const getHistoricalData = async ({
  instrument_token,
  interval = INTERVALS.min_5,
  from_date = null,
  to_date = null,
}) => {
  const kiteconnect = AuthorizedKiteConnect()
  //   const params = { instrument_token, interval }
  //   if (from_date) params.from_date = from_date
  //   if (to_date) params.to_date = to_date

  console.log(instrument_token, interval, from_date, to_date)
  const data = await kiteconnect.getHistoricalData(
    instrument_token,
    interval,
    from_date,
    to_date
  )
  console.log(data)

  console.log('=====')

  const heikenAshi = calculateHeikenAshi(...[data])
  console.log(heikenAshi)
}

const date = format(new Date('2024-05-07 10:00:00'), 'yyyy-MM-dd HH:mm:ss')
const to = format(new Date('2024-05-07 15:30:00'), 'yyyy-MM-dd HH:mm:ss')

getHistoricalData({
  instrument_token: 256265,
  from_date: date,
  to_date: to,
}).catch((e) => console.log(e))
