var request = require('request');

module.exports.updateRates = function (openExchangeRatesURL) {
  request.get(openExchangeRatesURL, function (err, res) {
    console.log(JSON.parse(res.body));
  })
}