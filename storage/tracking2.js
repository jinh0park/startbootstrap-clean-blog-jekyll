window.addEventListener('message', function(e) {
  console.log(e.data); // { hello: 'parent' }
  var item = window.location.href;
  console.log(item); // zerocho
  document.getElementById('iframe').contentWindow.postMessage(item, '*');
});
