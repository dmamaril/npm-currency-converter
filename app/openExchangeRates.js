var fs        = require('fs');
var path      = require('path');
var request   = require('request');
var Promise   = require('bluebird');
var utils     = require('./libs/openExchangeUtils.js');

var ratesPath = path.join(__dirname, './db/rates.txt');


module.exports.fetchLiveRates = function () {
  return new Promise(function (resolve, reject) {
    request.get(require('./config/openExchangeRates.js').URL, function (err, res) {
      var rates = JSON.parse(res.body).rates;
      fs.writeFileAsync(ratesPath, utils.update(rates))
        .then(resolve);
    });
  })
};

module.exports.fetchLocalRates = function () {
  return new Promise(function (resolve, reject) {
    fs.readFileAsync(ratesPath, 'utf-8')
      .then(function (contents) {
        resolve(utils.parser(contents));
      });    
  })
};
