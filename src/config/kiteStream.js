const KiteTicker = require('kiteconnect').KiteTicker
const { config } = require('./env')

const test = async () => {
  const ticker = new KiteTicker({
    api_key: config.kite.api_key,
    access_token: 'mzoxJfNkhmuanh2CWPE2WDZBfNk17gd5',
  })

  ticker.connect()
  console.log(ticker)
  ticker.on('ticks', onTicks)
  ticker.on('connect', subscribe)
  ticker.autoReconnect(true)

  function onTicks(ticks) {
    console.log('Ticks', ticks)
  }

  function subscribe() {
    console.log('subscribe')
    const items = [256265, 12023554]
    ticker.subscribe(items)
    ticker.setMode(ticker.modeFull, items)
  }
}

test().catch((e) => {
  console.log(e)
})
