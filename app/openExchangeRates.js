var fs        = require('fs');
var path      = require('path');
var request   = require('request');
var Promise   = require('bluebird');
var utils     = require('./openExchangeRateUtils.js');

fs            = Promise.promisifyAll(fs);

var ratesPath = path.join(__dirname, './db/rates.txt');

module.exports.URL = 'http://openexchangerates.org/api/latest.json?app_id=';

module.exports.init = function (fetchInterval) {
  fetchInterval = fetchInterval || 3600000;
  setInterval(module.exports.fetchOptions, fetchInterval, {});
};

module.exports.createProxy = function (task, options) {
  return new Promise(function (resolve, reject) { 
    module.exports.fetchOptions(options)
          .then(function (rates) {
            resolve(utils[task](options, rates));
          });
  })
};

module.exports.fetchOptions = function (options) {
  return new Promise(function (resolve, reject) {
    var fetchOption = options.live ? module.exports.fetchLiveRates : module.exports.fetchLocalRates;
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