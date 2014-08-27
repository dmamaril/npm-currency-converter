var fs      = require('fs');
var Promise = require('bluebird');
var oxr     = require('./app/openExchangeRates.js');


fs = Promise.promisifyAll(fs);

module.exports.convert = function (options) {
  return new Promise(function (resolve, reject) {
    resolve(
      oxr.fetchLiveRates()
         .then(oxr.fetchLocalRates)
         .then(function (rates) {
            var convertedRate = (options.amount / rates[options.convertFrom]['rate']) * rates[options.convertTo]['rate'];
            return {
              'currency'  : options.convertTo,
              'symbol'    : rates[options.convertTo].symbol,
              'amount'    : convertedRate.round(2)
            }
         })
    )
  })
};

