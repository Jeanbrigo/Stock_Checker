const apikey = "IJNV4P2J1BEX9AZ5"



'use strict';
// var request = require('request');

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&&outputsize=compact&apikey=${apikey}`;

// request.get({
//     url: url,
//     json: true,
//     headers: {'User-Agent': 'request'}
//   }, (err, res, data) => {
//     if (err) {
//       console.log('Error:', err);
//     } else if (res.statusCode !== 200) {
//       console.log('Status:', res.statusCode);
//     } else {
//       // data is successfully parsed as a JSON object:
//       console.log(data);
//     }
// });


$.ajax(url)
.then((stock) => {
    console.log(stock)
    console.log(stock["Meta Data"]["2. Symbol"])

    const $main = $("main")
        $main.empty()
        $main.html(`
        <h1>${stock["Meta Data"]["2. Symbol"]}</h1>
        <h2>${stock["Time Series (5min)"]["2022-10-21 08:15:00"]["4. close"]}</h2>
        `)


})

