npm-currency-converter
=========================
Conversion rates between currencies and rate conversion!

<h1> Start </h1>
Register for your <a href='https://openexchangerates.org/signup/free'>openexchangerates</a>.
install the package
```
npm install currency-converter
```
require the module. 
NOTE: Default fetchInterval value is set to one hour.
```
var cc = require('currency-converter')({ CLIENTKEY: YOUR_OPEN_EXCHANGE_RATES_KEY, [fetchInterval: 3600000] });
```

<h1> Usage </h1>
This module makes it <em>extremely</em> easy for you to convert currencies. The very basic input takes in two parameters. <b> convertFrom </b> &  <b> convertTo </b> have to be valid country codes. See list <a href='http://www.localeplanet.com/api/auto/currencymap.html'> here</a>. The module fetches live rates on initialize, saves it locally, and retrieves locally saved rates by default, unless otherwise specificed.


<h2>.convert(amount, convertFrom, convertTo, [live])</h2> 
converts an amount specificed to a specific currency. <em>live</em> is an optional parameter that uses live rates from <a href='http://openexchangerates.org'>openexchangerates.org</a> 

```
{
    "currency": "EUR",
    "symbol": "€",
    "amount": 0.76
}
```

<h2>.rates(convertFrom, convertTo, [live])</h2> 
returns the conversion rate between two currencies.
```
  .rates('USD', 'EUR') // => 0.76
```