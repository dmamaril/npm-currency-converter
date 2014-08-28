var fs        = require('fs');
var path      = require('path');
var request   = require('request');
var Promise   = require('bluebird');
var utils     = require('./openExchangeRateUtils.js');

var ratesPath = path.join(__dirname, './db/rates.txt');

module.exports.URL = 'http://openexchangerates.org/api/latest.json?app_id=';

module.exports.init = function (fetchInterval) {
  fetchInterval = fetchInterval || 3600000;
  setInterval(module.exports.fetchOptions, fetchInterval);
};

module.exports.createProxy = function (task, options) {
  module.exports.fetchOptions(options)
        .then(function (rates) {
          return module.exports[task](options, rates);
        });
};

module.exports.fetchOptions = function (options) {
  return new Promise(function (resolve, reject) {
    var fetchOption = options.local ? module.exports.fetchLocalRates : module.exports.fetchLiveRates;
    resolve(fetchOption(options));
  });
}

module.exports.fetchLiveRates = function (options) {
  return new Promise(function (resolve, reject) {
    request.get(module.exports.URL, function (err, res) {
      fs.writeFileAsync(ratesPath, utils.write(JSON.parse(res.body).rates))
        .then(function () {
          options ? resolve(module.exports.fetchLocalRates(options)) : resolve();
        })
    });
  })
};

module.exports.fetchLocalRates = function (options) {
  return new Promise(function (resolve, reject) {
    fs.readFileAsync(ratesPath, 'utf-8')
      .then(function (contents) {
        contents.length ? 
          resolve(utils.read(contents, options.convertFrom, options.convertTo)) :
          resolve(module.exports.fetchLiveRates(options));
      });    
  })
};

module.exports.formatConversion = function (options, rates) {
  var convertedRate = (options.amount / rates[0]['rate']) * rates[1]['rate'];
  return {
    'currency'  : options.convertTo,
    'symbol'    : rates[1].symbol,
    'amount'    : utils.round(convertedRate) };
 };

 module.exports.formatConversionRate = function (options, rates) {
  return utils.round( ((1/rates[0]['rate']) * rates[1]['rate']) );
 };