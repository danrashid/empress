var my = {};

(function () {
  var persistentParams = ['range', 'start', 'end'];

  function makeUrl(currentUrl, pathPostfix, accountGuid, brandGuid) {
    accountGuid = accountGuid || currentUrl.match(/\/accounts\/(\w+)/)[1];
    brandGuid = brandGuid || currentUrl.match(/\/brands\/(\w+)/)[1];

    var url = '/accounts/' + accountGuid + '/brands/' + brandGuid,
      params = [];

    if (pathPostfix) {
      url += '/' + pathPostfix;
    }

    persistentParams.forEach(function (name) {
      var regex = new RegExp('[?&]' + name + '=(\\d+)'),
        matches = currentUrl.match(regex);

      if (matches) {
        params.push({
          name: name,
          value: matches[1]
        });
      }
    });

    params.forEach(function (param, i) {
      url += i === 0 ? '?' : '&';
      url += param.name + '=' + param.value;
    });

    return url;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = function (currentUrl) {
      return function (pathPostfix, accountGuid, brandGuid) {
        return makeUrl(currentUrl, pathPostfix, accountGuid, brandGuid);
      };
    };
  } else {
    my.url = function (pathPostfix, accountGuid, brandGuid) {
      return makeUrl(window.location.href, pathPostfix, accountGuid, brandGuid);
    };
  }
})();
