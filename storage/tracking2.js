window.addEventListener('message', function(e) {
  var item = escape(window.location.href);
  document.getElementById('iframe').contentWindow.postMessage("url="+item, '*');
});
