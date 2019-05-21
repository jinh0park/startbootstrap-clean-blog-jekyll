var model;
(async () => {
  const model_ = await tf.loadGraphModel('./tfjs-frozen/tensorflowjs_model.pb');
  return model_
})().then(function(data) {
  model = data;
  alert("로딩 완료");
})

var execute = function(){
  var box;
  (() => {
    console.time("q");
    var context = document.getElementById('blah');
    var img = tf.browser.fromPixels(context);
    [h,w,c] = img.shape;
    img = img.reshape([1,h,w,c]);
    model.executeAsync(img).then(
      function(data) {
        console.log(
          data.slice([0, 0], [1, 1]).squeeze().arraySync()
        );
        box = data.slice([0, 0], [1, 1]).squeeze().arraySync()
        boxing(h, w, box);
        console.timeEnd("q")
      })
  })();
}

var b;

var boxing = function (h, w, box) {
  b = box;
  console.log(box);
  var c = document.getElementById("myCanvas");
  c.height = h;
  c.width = w;
  var ctx = c.getContext("2d");
  var img = document.getElementById("blah");
  ctx.drawImage(img, 0, 0);

  [h1_, w1_, h2_, w2_] = box;
  h1 = parseInt(h * h1_);
  w1 = parseInt(w * w1_);
  h2 = parseInt(h * h2_);
  w2 = parseInt(w * w2_);

  ctx.rect(w1, h1, w2-w1, h2-h1);
  ctx.stroke();

}
