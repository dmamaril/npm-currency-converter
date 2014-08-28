var fs          = require('fs');
var Promise     = require('bluebird');
var currencies  = require('./app/libs/currencies.js');
var oxr         = require('./app/openExchangeRates.js');

fs = Promise.promisifyAll(fs);

module.exports.convert = function (options) {
  return new Promise(function (resolve, reject) {
    resolve(
      oxr.fetchOptions(options)
         .then(function (rates) {
            return oxr.formatConversion(options, rates);
         })
    );
  });
};

module.exports.rates = function (options) {
  return new Promise(function (resolve, reject) {
    resolve(
      oxr.fetchOptions(options)
         .then(function (rates) {
            return oxr.formatConversionRate(options, rates);
         })
    );
  });
};

module.exports.verifyInput = function (input) {
  var checkAmount   = true;
  var checkCurrency = currencies.hasOwnProperty(input.convertFrom) && 
                      currencies.hasOwnProperty(input.convertTo);

  if (input.amount) { checkAmount = !isNaN(input.amount); }

  return checkAmount && checkCurrency;
};