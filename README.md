npm-currency-converter
=========================
Conversion rates between currencies and rate conversion!

<h1> Start </h1>
install the package
```
npm install <insert npm name later>
```
require the module
```
var cc = require('<insert npm name later>);
```

<h2> Usage </h2>
This module makes it <em>extremely</em> easy for you to convert currencies. All methods take an input object. The very basic input takes in two parameters. <b> convertFrom </b> &  <b> convertTo </b> have to be valid country codes. See list <a href='http://www.localeplanet.com/api/auto/currencymap.html'> here</a>.

```
var input = {
  convertFrom   : 'USD',
  convertTo     : 'EUR'
};
```

