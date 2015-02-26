var urlHelper = require('../helpers/url');

describe('URL Helper', function() {
  it('should omit the protocol and hostname', function () {
    var url = urlHelper('http://example.com/accounts/a/brands/b')();

    expect(url).toBe('/accounts/a/brands/b');
  });
  it('should support account and brand overrides', function () {
    var url = urlHelper('http://example.com/accounts/a/brands/b')('', 'x', 'y');

    expect(url).toBe('/accounts/x/brands/y');
  });
  it('should append a provided path', function () {
    var url = urlHelper('http://example.com/accounts/a/brands/b')('champagne');

    expect(url).toBe('/accounts/a/brands/b/champagne');
  });
  it('should preserve persistent query parameters', function () {
    var url = urlHelper('http://example.com/accounts/a/brands/b?start=123&end=456')('champagne');

    expect(url).toBe('/accounts/a/brands/b/champagne?start=123&end=456');
  });
  it('should discard non-persistent query parameters', function () {
    var url = urlHelper('http://example.com/accounts/a/brands/b?foo=bar&range=789&baz=bang')();

    expect(url).toBe('/accounts/a/brands/b?range=789');
  });
});
