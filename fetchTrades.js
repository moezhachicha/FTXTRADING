const WebS = require('ws');
const fs = require('fs');
const settings = require ('./settings.js');
const tradesPath = settings.TRADES_PATH;
const tradesLogPath = settings.TRADES_LOGS_PATH;
const wsT = new WebS(settings.FTX_WSPOINT);
const tradesRequest = settings.FTX_TRADESREQUEST;


let tradesparsed = 0;
let tradeMsgsRecieved = 0;
let RequestNumber = 1;


wsT.on('open', function open() {
  wsT.send(tradesRequest);
});

const compteurPing = () => {
  console.log(Date());
  wsT.send(' {"op": "ping"}');
  console.log(`nbr of msgs received : ${tradeMsgsRecieved}`);
  console.log(`Trades parsed : ${tradesparsed}`);
  console.log(`Request number ${RequestNumber}`);
  
};
const fetchTrades = ()=>{
  wsT.on('message', function incoming(data) {
    tradeMsgsRecieved++;
    row = JSON.parse(data);
    if (row.type == 'update') {
      let rowToWrite = JSON.stringify({
        time: row.data[0].time,
        liqudiation: row.data[0].liqudiation,
        size: row.data[0].size,
        side: row.data[0].side,
        price: row.data[0].price
      });
      console.log(rowToWrite);
      fs.appendFileSync(tradesPath, rowToWrite + ',');
      tradesparsed++;
    } else if (row.type !== 'update') {
      let rowToWrite = JSON.stringify({ date: Date(), row: row });
  
      fs.appendFileSync(tradesLogPath, rowToWrite + ',\n');
  
      console.log('Trade message below:');
      Object.entries(row).forEach(msg => {
        console.log(`${msg[0]} : ${msg[1]}`);
      });
      RequestNumber++;
    }
  });

  setInterval(compteurPing, 15000);
}

module.exports.fetchTrades = fetchTrades;

