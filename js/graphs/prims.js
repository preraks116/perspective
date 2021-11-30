document.addEventListener('contextmenu', event => event.preventDefault());

var vertices = [];

// function to check if vertices are overlapping
function checkOverlap(v1, v2) {
    if (v1.x < v2.x + v2.width &&
        v1.x + v1.width > v2.x &&
        v1.y < v2.y + v2.height &&
        v1.y + v1.height > v2.y) {
                    return true;
    }
    return false;
}

function setup() {
    createCanvas(720, 400);

    for (var i = 0; i < 3; i++) {
        var v = createVector(random(width - 50) + 50, random(height - 50) + 50);
        vertices.push(v);
    }
}

function mousePressed() {
    if(mouseButton == LEFT){
        var v = createVector(mouseX, mouseY);
        // check if overlapping with any vertex
        for (var i = 0; i < vertices.length; i++) {
            if (checkOverlap(v, vertices[i])) {
                return;
            }
        }
        vertices.push(v);
    }
    else if(mouseButton == RIGHT){
        // removes vertex closest to mouse
        var record = 500000;
        var rIndex;
        for (var i = 0; i < vertices.length; i++) {
            var d = dist(vertices[i].x, vertices[i].y, mouseX, mouseY);
            if (d < record) {
                record = d;
                rIndex = i;
            }
        }
        vertices.splice(rIndex, 1);
    }
}

function drawBorders() {
    stroke(12, 23, 133);
    strokeWeight(4);
    noFill();
    rect(0, 0, width, height);
}

function draw() {
    background(0);
    drawBorders();
    prims();
    drawGraph();
}

function prims()
{
    var reached = [];
    var unreached = [];
    // add vertices to reached and unreached arrays
    for (var i = 0; i < vertices.length; i++) {
        unreached.push(vertices[i]);
    }

    reached.push(unreached[0]);
    unreached.splice(0, 1);
    while (unreached.length > 0) {
        var record = 500000;
        var rIndex;
        var uIndex;
        for (var i = 0; i < reached.length; i++) {
            for (var j = 0; j < unreached.length; j++) {
                var v1 = reached[i];
                var v2 = unreached[j];
                var d = dist(v1.x, v1.y, v2.x, v2.y);
                if (d < record) {
                    record = d;
                    rIndex = i;
                    uIndex = j;
                }
            }
        }
        stroke(255);
        strokeWeight(2);
        line(
            reached[rIndex].x,
            reached[rIndex].y,
            unreached[uIndex].x,
            unreached[uIndex].y
        );
        reached.push(unreached[uIndex]);
        unreached.splice(uIndex, 1);
    }
}

function drawGraph() {
    for (var i = 0; i < vertices.length; i++) {
        fill(12, 23, 133);
        stroke(0);

        ellipse(vertices[i].x, vertices[i].y, 16, 16);
    }
}