module.exports = {
    FTX_WSPOINT: "wss://ftx.com/ws/",
    FTX_TRADESREQUEST:'{"op": "subscribe", "channel": "trades", "market": "BTC-PERP"}',
    FTX_KEY: process.env.FTX_KEY,
    FTX_SECRET: process.env.FTX_SECRET,
    TRADES_PATH: 'tradesData/trade_data.txt',
    TRADES_LOGS_PATH: 'tradesData/trades_log.txt',

  };