var fs      = require('fs');
var Promise = require('bluebird');
var oxr     = require('./app/libs/openExchangeRates.js');


fs = Promise.promisifyAll(fs);


var CurrencyConverter = {};

CurrencyConverter.convert = function (input) {
  return new Promise(function (resolve, reject) {
    reject();
  });
};

CurrencyConverter.rates = function (rates) {
  console.log(rates);
};

module.exports = CurrencyConverter;