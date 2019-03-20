var w;

function grayscale(img){
    var [r, g, b, a] = tf.split(img, 4, 3);
    var gray_img = r.add(g).add(b).div(3);
    gray_img = a.as4D(1,28,28,1);
    return gray_img
}
var model;

(async () => {
    const model_ = await tf.loadLayersModel('../pretraining/mnist/saved_model_tfjs_new/model.json');
    return model_
})().then(function (data) {
    model = data;
    data.predict(tf.zeros([1,28,28,1]));
    alert("로딩 완료");
});

function f(){
    var tt = tf.tensor4d(Array.from(context.getImageData(0,0,28,28).data), [1,28,28,4]);
    var ttt = grayscale(tt);
    return model.predict(ttt).argMax(1);
}








