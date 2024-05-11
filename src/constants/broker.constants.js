module.exports.BROKER = {
  ZERODHA: 'Zerodha',
  SHOONYA: 'Shoonya',
  FYERS: 'Fyers',
}

module.exports.EXCHANGE = {
  MF: 'MF',
  NSE: 'NSE',
  CDS: 'CDS',
  BSE: 'BSE',
  NFO: 'NFO',
  BFO: 'BFO',
}

module.exports.PRODUCTS = {
  CNC: 'CNC',
  NRML: 'NRML',
  MIS: 'MIS',
  BO: 'BO',
  CO: 'CO',
}

module.exports.ORDER_TYPES = {
  MARKET: 'MARKET',
  LIMIT: 'LIMIT',
  SL: 'SL',
  SL_M: 'SL-M',
}

module.exports.INSTRUMENT_TYPE = {
  PE: 'PE',
  CE: 'CE',
  FUT: 'FUT',
  EQ: 'EQ',
}

module.exports.SEGMENT = {
  BCD_FUT: 'BCD-FUT', // BSE Currency Derivatives Futures
  BCD_OPT: 'BCD-OPT', // BSE Currency Derivatives Options
  BFO_FUT: 'BFO-FUT', // BSE Futures
  BFO_OPT: 'BFO-OPT', // BSE Options
  BSE: 'BSE', // BSE Equity
  CDS_FUT: 'CDS-FUT', // Currency derivatives Segment Futures
  CDS_OPT: 'CDS-OPT', // Currency derivatives Segment Options
  INDICES: 'INDICES',
  MCX_FUT: 'MCX-FUT', // Multi Commodity Exchange
  MCX_OPT: 'MCX-OPT', // Multi Commodity Exchange
  NCO: 'NCO',
  NCO_FUT: 'NCO-FUT',
  NCO_OPT: 'NCO-OPT',
  NFO_FUT: 'NFO-FUT', // NSE Futures
  NFO_OPT: 'NFO-OPT', // NSE Options
  NSE: 'NSE', // NSE Equity
}
