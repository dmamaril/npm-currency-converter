var fs      = require('fs');
var Promise = require('bluebird');
var oxr     = require('./app/openExchangeRates.js');

fs = Promise.promisifyAll(fs);

module.exports.convert = function (options) {
  return new Promise(function (resolve, reject) {
    resolve(
      oxr.fetchOptions(options)
         .then(function (converted) {
          return converted;
         })
    )
  })
};
