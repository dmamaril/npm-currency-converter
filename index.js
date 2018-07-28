var Promise     = require('bluebird');
var currencies  = require('./app/libs/currencies.js');
var oxr         = require('./app/openExchangeRates.js');
var utils       = require('./app/openExchangeRateUtils.js');

var currency_converter = {};

currency_converter.currencies = currencies;
currency_converter.shutdown = oxr.shutdown;

currency_converter.convert = function (amount, convertFrom, convertTo, live) {
  convertFrom = convertFrom.toUpperCase();
  convertTo   = convertTo.toUpperCase();

  return new Promise(function (resolve, reject) {
    utils.verifyInput(convertFrom, convertTo, amount) ?
      resolve(oxr.createProxy('formatConversion',
        { 'amount' : amount, 'convertFrom' : convertFrom, 'convertTo' : convertTo, 'live' : live })) :
      reject();
  });
};

currency_converter.rates = function (convertFrom, convertTo, options) {
  convertFrom = convertFrom.toUpperCase();
  convertTo   = convertTo.toUpperCase();

  if (false === options || true === options) {
    options = {
      live: options
    };
  }
  options = options || {};

  return new Promise(function (resolve, reject) {
    if (!utils.verifyInput(convertFrom, convertTo)) {
      reject();
      return;
    }
    resolve(oxr.createProxy('formatConversionRate', {
      convertFrom: convertFrom,
      convertTo: convertTo,
      live: options.live,
      round: options.round
    }));
  });
};

module.exports = function (configs) {
  oxr.URL += configs.CLIENTKEY;
  oxr.init(configs.fetchInterval);

  return currency_converter;
};
