const express = require ('express');
const app = express() ;
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const fetchTr = require('./fetchTrades');
const fetchTi = require('./fetchTickers');

  
/* ---- READING START ---- */

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});



var recursiveAsyncReadLine = function () {
    rl.question('choose between trades or tickers : \n answer : ', function (answer) {
        if (answer == 'trades'){
            fetchTr.fetchTrades();
            return rl.close();
        }
          
        if (answer == "tickers")
            return rl.close();
            //TODO
            //fetchTi.fetch();
        console.log('\n\n The answer is not clear ! Your answer was: "', answer, '"\n\n\n');
        recursiveAsyncReadLine(); 
    });
};

setTimeout(async() => { 
  console.log("-----   TEST FTX BY Hachicha MOEZ   ----- \n");
  recursiveAsyncReadLine();
 }, 1000);


/* ---- READING END ---- */
