var request = require('request');

module.exports.updateRates = function () {
  request.get(require('./config/openExchangeRates.js').URL, function (err, res) {
    console.log(JSON.parse(res.body));
  })
}