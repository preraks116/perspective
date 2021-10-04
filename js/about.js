var canvas;

let t = 0;;
let q = 10;;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    background(0);
}

function draw() {
    translate(width / 2, height / 2);
    for(var a = 0; a < TWO_PI; a += 0.1){
        var r = 100;
        var x = 100 * cos(a);
        var y = 100 * sin(a);
        stroke(255, 255, 255, map(a, 0, TWO_PI, 0, 255));
        line(x, y, x, y);
    }
}

