var chai    = require('chai');
var cc      = require('../index.js')({
  CLIENTKEY: process.env.OPEN_EXCHANGE_RATES_KEY
});

chai.should();
var expect  = chai.expect;

chai.use(require('chai-as-promised'));


describe('conversionRates', function () {
  it('should reject invalid country codes not found in currencies library', function  () {
    return cc.rates('BITCOIN', 'USD').should.be.rejected;
  });

  it('should return a conversion rate input', function () {
    return cc.rates('USD', 'EUR').should.eventually.be.a('number');
  });

  it('should resolve on lower case country codes', function () {
    return cc.rates('usd', 'eur').should.be.ok;
  });
});


describe('currencyConversion', function () {
  it('should reject when amount isNaN', function () {
    return cc.convert('test', 'USD', 'EUR').should.be.rejected;
  });

  it('should return with the converted rate', function () {
    return cc.convert(1, 'USD', 'EUR').should.eventually.have.property('amount').that.is.not.equal(1);
  });

  it('should convert negative numbers', function () {
    return cc.convert(-1, 'USD', 'EUR').should.eventually.have.property('amount').that.is.not.equal(-1);
  });

  it('should return an object with the following properties', function () {
    return cc.convert(1, 'USD', 'EUR').should.eventually.include.keys('amount', 'symbol', 'currency');
  });

  it('should return the currency in the desired country code', function () {
    return cc.convert('1', 'USD', 'EUR').should.eventually.have.property('currency').that.equals('EUR');
  });
});

describe('currencies', function () {
  it('should include currency map', function () {
    expect(cc.currencies).to.be.an('object');
    expect(cc.currencies.USD).to.deep.equal({
      'symbol': '$',
      'name': 'US Dollar',
      'symbol_native': '$',
      'decimal_digits': 2,
      'rounding': 0,
      'code': 'USD',
      'name_plural': 'US dollars'
    });
  });
});

describe('shutdown', function () {
  it('should expose the method', function () {
    expect(cc.shutdown).to.be.a('function');
  });
  it('should clear the interval', function () {
    cc.shutdown().should.eventually.be.fulfilled;
  });
  it('should not allow duplicate shutdown', function () {
    cc.shutdown().should.eventually.be.rejectedWith(Error);
  });
});
