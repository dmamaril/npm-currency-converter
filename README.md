npm-currency-converter
=========================
Conversion rates between currencies and rate conversion!

<h1> Start </h1>
Register for your <a href='https://openexchangerates.org/signup/free'>openexchangerates</a>.
install the package
```
npm install currency-converter
```
require the module
```
var cc = require('currency-converter')("YOUR_OPEN_EXCHANGE_RATES_KEY");
```

<h1> Usage </h1>
This module makes it <em>extremely</em> easy for you to convert currencies. All methods take an input object. The very basic input takes in two parameters. <b> convertFrom </b> &  <b> convertTo </b> have to be valid country codes. See list <a href='http://www.localeplanet.com/api/auto/currencymap.html'> here</a>. By default, <b>.convert()</b> will retrieve the live rates from <a href='http://openexchangerates.org'>openexchangerates.org</a>

```
var input = {
  convertFrom   : 'USD',
  convertTo     : 'EUR'
};
```

<h2>.convert(input)</h2> 
converts an amount specificed to a specific currency. With that said, you have two possible properties that you'll need to add to your input object.

```
input.amount = 1.00;
input.local  = true; // optional
```
adding a <b>local</b> property will retrieve locally stored rates.

```
{
    "currency": "EUR",
    "symbol": "€",
    "amount": 0.76
}
```

<h2>.rates(input)</h2> 
returns the conversion rate between two currencies. Additionally, you can also set <b>input.local</b> should you choose to use locally stored rates.
```
  {
    "USD_EUR": 0.76
  }
```