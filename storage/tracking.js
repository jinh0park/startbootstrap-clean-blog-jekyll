var sendData = function(data) {
  //The type of data must be JSON
  $.ajax({
    dataType: 'jsonp',
    data: data,
    jsonp: 'callback',
    url: 'https://1e68f732.ngrok.io/track?callback=?',
    success: function(data) {
      //LOG
      console.log('success');
      console.log(JSON.parse(Object.keys(data)[1]));
    }
  });
}

var getCookie = function(name) {
  var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value? value[2] : null;
};

var setCookie = function(name, value, exp) {
  var date = new Date();
  date.setTime(date.getTime() + exp*24*60*60*1000);
  document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
};

var issueID = function() {
  // 이미 쿠키에 id가 있으면 설정하지 않는다.
  if(getCookie('_zeroid')){
    return false
  }
  var date= new Date()
  exp = 7;  //7일 후에 만료
  date.setTime(date.getTime() + exp*24*60*60*1000);
  var value = `ZERO.${date.getTime()}.${Math.random()}`;
  document.cookie = '_zeroid=' + value + ';expires=' + date.toUTCString() + ';path=/';
}
