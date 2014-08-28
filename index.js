var Promise     = require('bluebird');
var currencies  = require('./app/libs/currencies.js');
var oxr         = require('./app/openExchangeRates.js');
var utils       = require('./app/openExcahngeRateUtils.js');

var currency_converter = {};

currency_converter.convert = function (amount, convertFrom, convertTo) {
  return new Promise(function (resolve, reject) {
    utils.verifyInput(amount, convertFrom, convertTo) ? 
      resolve(oxr.createProxy('formatConversion', 
        { 'amount' : amount, 'convertFrom' : convertFrom, 'convertTo' : convertTo })) : 
      reject();
  });
};

currency_converter.rates = function (convertFrom, convertTo) {
  return new Promise(function (resolve, reject) {
    utils.verifyInput(convertFrom, convertTo) ?
    resolve(oxr.createProxy('formatConversionRate', 
      { 'convertFrom' : convertFrom, 'convertTo' : convertTo })) : 
    reject();
  });
};

module.exports = function (configs) {
  oxr.URL += configs.CLIENTKEY;
  oxr.init(configs.fetchInterval);

  return currency_converter;
};