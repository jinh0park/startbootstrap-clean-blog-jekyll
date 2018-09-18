function sendData(data) {
  //The type of data must be JSON
  $.ajax({
    dataType: 'jsonp',
    data: data,
    jsonp: 'callback',
    url: 'https://77a01196.ngrok.io/endpointJSONP?callback=?',
    success: function(data) {
      //LOG
      console.log('success');
      console.log(JSON.parse(Object.keys(data)[1]));
    }
  });
}
