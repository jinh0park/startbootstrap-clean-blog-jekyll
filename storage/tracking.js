var sendData = function(data) {
  //The type of data must be JSON
  $.ajax({
    dataType: 'jsonp',
    data: data,
    jsonp: 'callback',
    url: 'https://bfa3ddef.ngrok.io/transaction?callback=?',
    success: function(data) {
      // //LOG
      // console.log('success');
      // console.log(JSON.parse(Object.keys(data)[1]));
    }
  });
};

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
  // 이미 쿠키에 id가 있으면 설정하지 않는다.
  // if (getCookie('_zeroid')) {
  //   return false
  // }
  var date = new Date()
  exp = 7; //7일 후에 만료
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  var value = `ZERO.${date.getTime()}.${Math.round(Math.random()*1000000000)}`;
  document.cookie = '_zeroid=' + value + ';expires=' + date.toUTCString() + ';path=/';
};


var getParameterByName = function(name, url) {
  if (!url) url = window.location.href;
  //name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

//모든 페이지에서 Default로 실행되는 함수
var iap = (function() {
  data = {};
  _zeroid = getCookie('_zeroid');

  if (!_zeroid) { //쿠키가 설정되어 있지 않을 경우
    last_camp = getParameterByName('iap');
    if (!last_camp) return; //우리 캠페인을 통하지 않았으면 종료
    data.last_camp = last_camp;
    issueID();
    _zeroid = getCookie('_zeroid');
  }
  last_camp = getParameterByName('iap');
  if (last_camp) data.last_camp = last_camp;
  data._zeroid = _zeroid;
  data.url = escape(window.location.href);
  sendData(JSON.stringify(data))
  return 0;
})();
