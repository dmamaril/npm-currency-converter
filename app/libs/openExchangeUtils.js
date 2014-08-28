var fs         = require('fs');
var currencies = require('./currencies.js');

// Kudos to: http://stackoverflow.com/a/19722641 
Number.prototype.round = function(places) {
  return +(Math.round(this + "e+" + places)  + "e-" + places);
}

module.exports.update = function (liveRates) {
  var ratesTxt = '';

  for (var currency in liveRates) {
    if (currencies.hasOwnProperty(currency)) {
      var symbol = currencies[currency]["symbol_native"];
      var rate   = liveRates[currency].round(2);

      ratesTxt += currency + '=' + symbol + ' ' + rate + '\n'      
    }
  }

  return ratesTxt.slice(0, -1);
};

module.exports.parser = function (localRates, convertFrom, convertTo) {
  var results = {};
  localRates  = localRates.split('\n');

  for (var i = 0 ; i < localRates.length; i ++) {
    if (results[convertFrom] && results[convertTo]) {
      return [ results[convertFrom], results[convertTo] ];
    }
    
    var temp      = localRates[i].split('=');
    var currency  = temp[0];

    temp          = temp[1].split(' ');
    var symbol    = temp[0];
    var rate      = temp[1];

    results[currency] = { 'symbol' : symbol, 'rate' : rate };
  }
};
