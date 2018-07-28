npm-currency-converter
=========================

Conversion rates between currencies and rate conversion using [openexchangerates](https://openexchangerates.org).

Pulls the exchange rate remotely and saves locally to a text file.

# Getting Started

Register for a client key at [openexchangerates.org](https://openexchangerates.org/signup/free)

Install the package:

```
npm install currency-converter
```

Use it:

```
var cc = require('currency-converter')({
  CLIENTKEY: YOUR_OPEN_EXCHANGE_RATES_KEY, [fetchInterval: 3600000]
});
```

__NOTE: Default fetchInterval value is set to one hour.__

# Usage

This module makes it __extremely__ easy for you to convert currencies.

The very basic input takes in two parameters. _convertFrom_ & _convertTo_ must be valid country codes. See list <a href='http://www.localeplanet.com/api/auto/currencymap.html'> here</a>.

The module fetches live rates on initialize, saves it locally, and retrieves locally saved rates by default, unless otherwise specified.

## .convert(amount, convertFrom, convertTo, [live])

Converts an amount specified to a specific currency. _live_ is an optional parameter
that uses live rates from [openexchangerates.org](https://openexchangerates.org/signup/free)

Response:

```
cc.rates(1, 'USD', 'EUR')
  .then(function(converted) {
    // {
    //    "currency": "EUR",
    //    "symbol": "€",
    //    "amount": 0.76
    // }
  });
```

## .rates(convertFrom, convertTo, [live])

Returns the conversion rate between two currencies:

```
cc.rates('USD', 'EUR')
  .then(function(rate) {
    // rate => 0.76
  });
```

## .currencies

The map of currency codes to info about the currency

```
cc.currencies.EUR
// {
//    "currency": "EUR",
//    "symbol": "€",
//    "amount": 0.76
// }

```
