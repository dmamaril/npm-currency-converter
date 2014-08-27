var fs      = require('fs');
var Promise = require('bluebird');
var oxr     = require('./app/openExchangeRates.js');


fs = Promise.promisifyAll(fs);

module.exports.convert = function (options) {
  return new Promise(function (resolve, reject) {
    resolve(
      oxr.fetchLiveRates()
         .then(function () {
            return oxr.fetchLocalRates(options.convertFrom, options.convertTo);
         })
         .then(function (rates) {
            var convertedRate = (options.amount / rates[0]['rate']) * rates[1]['rate'];
            return {
              'currency'  : options.convertTo,
              'symbol'    : rates[1].symbol,
              'amount'    : convertedRate.round(2)
            }
         })
    )
  })
};

