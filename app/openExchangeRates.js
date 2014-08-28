var fs        = require('fs');
var path      = require('path');
var request   = require('request');
var Promise   = require('bluebird');
var utils     = require('./libs/openExchangeUtils.js');

var ratesPath = path.join(__dirname, './db/rates.txt');

module.exports.fetchOptions = function (options) {
  return new Promise(function (resolve, reject) {
    var fetchOption = options.local ? module.exports.fetchLocalRates : module.exports.fetchLiveRates;
    resolve(fetchOption(options));
  });
}

module.exports.fetchLiveRates = function (options) {
  return new Promise(function (resolve, reject) {
    request.get(require('./config/openExchangeRates.js').URL, function (err, res) {
      fs.writeFileAsync(ratesPath, utils.update(JSON.parse(res.body).rates))
        .then(function () {
          resolve(module.exports.fetchLocalRates(options));
        })
    });
  })
};

module.exports.fetchLocalRates = function (options) {
  return new Promise(function (resolve, reject) {
    fs.readFileAsync(ratesPath, 'utf-8')
      .then(function (contents) {
        resolve(utils.parser(contents, options.convertFrom, options.convertTo));
      });    
  })
};

module.exports.formatConversion = function (options, rates) {
  var convertedRate = (options.amount / rates[0]['rate']) * rates[1]['rate'];
  return {
    'currency'  : options.convertTo,
    'symbol'    : rates[1].symbol,
    'amount'    : convertedRate.round(2) };
 };

 module.exports.formatConversionRate = function (options, rates) {
  return ((1/rates[0]['rate']) * rates[1]['rate']).round(2);
 };