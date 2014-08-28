var fs          = require('fs');
var Promise     = require('bluebird');
var oxr         = require('./app/openExchangeRates.js');
var currencies  = require('./app/libs/currencies.js');
var OXR_KEY     = require('./app/libs/openExchangeRatesKey.js');

fs = Promise.promisifyAll(fs);

var currency_converter = {};

currency_converter.convert = function (options) {
  return new Promise(function (resolve, reject) {
    resolve(
      oxr.fetchOptions(options)
         .then(function (rates) {
            return oxr.formatConversion(options, rates);
         })
    );
  });
};

currency_converter.rates = function (options) {
  return new Promise(function (resolve, reject) {
    resolve(
      oxr.fetchOptions(options)
         .then(function (rates) {
            return oxr.formatConversionRate(options, rates);
         })
    );
  });
};

currency_converter.verifyInput = function (input) {
  var checkAmount   = true;
  var checkCurrency = currencies.hasOwnProperty(input.convertFrom) && 
                      currencies.hasOwnProperty(input.convertTo);

  if (input.amount) { checkAmount = !isNaN(input.amount); }

  return checkAmount && checkCurrency;
};

module.exports = function (openExchangeRatesKey) {
  OXR_KEY.URL += openExchangeRatesKey;
  return currency_converter;
};