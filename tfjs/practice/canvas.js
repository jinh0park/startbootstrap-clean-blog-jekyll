context = document.getElementById('canvas').getContext("2d");
canvas = document.getElementById('canvas');
hidden_image = document.getElementById('hidden-image');

const canvas_ = $('#canvas');

canvas_.mousedown(function (e) {
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;

    paint = true;
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    redraw();
});

canvas_.mousemove(function (e) {
    if (paint) {
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        redraw();
    }
});

canvas_.mouseup(function (e) {
    paint = false;
});

canvas_.mouseleave(function (e) {
    paint = false;
});

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

function addClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
}

function redraw() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

    context.strokeStyle = "#000000";
    context.lineJoin = "miter";
    context.lineWidth = 1;

    for (var i = 0; i < clickX.length; i++) {
        context.beginPath();
        if (clickDrag[i] && i) {
            context.moveTo(clickX[i - 1], clickY[i - 1]);
        } else {
            context.moveTo(clickX[i] - 1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.stroke();
    }
    var res = f();
    $("#result").text(res.dataSync()[0]);
}

$("#clear").mousedown(function (e) {
    clickX = [];
    clickY = [];
    clickDrag = [];
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    $("#result").text("");
});
