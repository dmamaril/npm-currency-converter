var Promise     = require('bluebird');
var currencies  = require('./app/libs/currencies.js');
var oxr         = require('./app/openExchangeRates.js');
var utils       = require('./app/openExchangeRateUtils.js');

var currency_converter = {};

currency_converter.convert = function (amount, convertFrom, convertTo, local) {
  return new Promise(function (resolve, reject) {
    utils.verifyInput(convertFrom, convertTo, amount) ? 
      resolve(oxr.createProxy('formatConversion', 
        { 'amount' : amount, 'convertFrom' : convertFrom, 'convertTo' : convertTo, 'local' : local })) : 
      reject();
  });
};

currency_converter.rates = function (convertFrom, convertTo, local) {
  return new Promise(function (resolve, reject) {
    utils.verifyInput(convertFrom, convertTo) ?
    resolve(oxr.createProxy('formatConversionRate', 
      { 'convertFrom' : convertFrom, 'convertTo' : convertTo, 'local' : local })) : 
    reject();
  });
};

module.exports = function (configs) {
  oxr.URL += configs.CLIENTKEY;
  oxr.init(configs.fetchInterval);

  return currency_converter;
};