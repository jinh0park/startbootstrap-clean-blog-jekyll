var model;
(async () => {
  const model_ = await tf.loadGraphModel('./tfjs-frozen/tensorflowjs_model.pb');
  return model_
})().then(function(data) {
  model = data;
  alert("로딩 완료");
})

var execute = function(){
  (() => {
    console.time("q");
    model.executeAsync(tf.zeros([1, 1000, 1000, 3])).then(
      function(data) {
        console.log(
          data.slice([0, 0], [1, 1]).squeeze().arraySync()
        );
        console.timeEnd("q")
      })
  })();
}
