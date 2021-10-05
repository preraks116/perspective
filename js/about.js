var canvas;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    angleMode(DEGREES);
}

function draw() {
    background(0);
    // translate(width / 2, height / 2);
    rotateX(60);
    scale(7);
    noFill();
    stroke(12,23,133);
    for (var i = 0; i < 15; i++) {
        // var r = map(sin(frameCount), -1, 1, 0, 150);
        // var g = map(i, 0, 15, 0, 150);
        // var b = map(cos(frameCount), -1, 1, 0, 150);
        // stroke(r, g, b);
        rotate(frameCount/50);
        beginShape();
        for (var j = 0; j < 360; j+=60) {
            strokeWeight(3);
            var rad = i * 3;
            var x = rad * cos(j);
            var y = rad * sin(j);
            var z = sin(frameCount * 2 + i * 10) * 50;
            vertex(x, y, z/5);
        }
        endShape(CLOSE);
    }
    

}