(function() {
  window.addEventListener('message', function(e) {
    var url = escape(window.location.href);

    var getCookie = function(name) {
      var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
      return value ? value[2] : null;
    };

    var setCookie = function(name, value, exp) {
      var date = new Date();
      date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
      document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
    };

    var issueID = function() {

      var date = new Date()
      exp = 7;
      date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
      var value = `ZERO.${date.getTime()}.${Math.round(Math.random()*1000000000)}`;
      document.cookie = '_zeroid=' + value + ';expires=' + date.toUTCString() + ';path=/';
    };


    var getParameterByName = function(name, url) {
      if (!url) url = window.location.href;

      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    };


    var msg = (function() {
      data = {};
      _zeroid = getCookie('_zeroid');

      if (!_zeroid) {
        last_camp = getParameterByName('iap');
        if (!last_camp) return null;
        data.last_camp = last_camp;
        issueID();
        _zeroid = getCookie('_zeroid');
      }
      last_camp = getParameterByName('iap');
      data.last_camp = last_camp || null;
      data._zeroid = _zeroid;
      data.url = escape(window.location.href);
      return `url=${data.url}&_zeroid=${data._zeroid}&last_camp=${data.last_camp}`
    })();

    if(!msg) return;

    document.getElementById('iframe').contentWindow.postMessage(msg, '*');
  });
})();
