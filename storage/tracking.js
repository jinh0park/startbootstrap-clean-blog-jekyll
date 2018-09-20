var sendData = function(data) {
  //The type of data must be JSON
  $.ajax({
    dataType: 'jsonp',
    data: data,
    jsonp: 'callback',
    url: 'https://9aa372f5.ngrok.io/transaction?callback=?',
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

var orderResult = function(){
  var order_id = document.getElementById('order_id').value;
  var date = new Date()
  var data_ = JSON.stringify({'_zeroid':getCookie('_zeroid'),'action':'order','order_id':order_id})
  sendData(data_)
}


//모든 페이지에서 Default로 실행되는 구간
issueID()

JSON.stringify({'_zeroid':getCookie('_zeroid'),'action':'visit'})
sendData(data_)
