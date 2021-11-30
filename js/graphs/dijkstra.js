var nodes = [];
var unvisited;

var startNode;
var targetNode;

var total = 10;
var maxCost = 10;

var routeFound = false;

function Node(x, y, d) {
    this.d = d;
    this.x = x;
    this.y = y;

    this.c = color(150, 0, 10);
    this.outline = color(0, 50, 200);

    this.edges = [];

    this.distance = Infinity;

    this.prev;
    this.inRoute = false;

    this.show = function() {
        fill(this.c);
        strokeWeight(3);
        if(this.inRoute) {
            stroke(this.outline);
        } else {
            stroke(70, 10, 10);
        }
        ellipse(this.x, this.y, this.d, this.d);
        textAlign(CENTER);
        noStroke();
        fill(255);
        if(this.distance != Infinity) {
            textSize(12);
            text(floor(this.distance), this.x, this.y + 4);
        } else {
            textSize(30);
            text("∞", this.x, this.y + 10);
        }
    }

    this.drawEdges = function() {
        for(var i = 0; i < this.edges.length; i++) {
            strokeWeight(3);
            stroke(100, 50);
            line(this.x, this.y, this.edges[i][0].x, this.edges[i][0].y);
            noStroke();
            fill(255);
            textSize(12);
            text(floor(this.edges[i][1]), (this.x + this.edges[i][0].x)/2, (this.y + this.edges[i][0].y)/2);
        }
    }
}


function setup() {
    createCanvas(720, 400);
    var index = 0;
    while(index < total) {
        var newX = 40 + random(720 - 80);
        var newY = 40 + random(400 - 80);
        var diameter = 25;
        if(!isOverlapping(newX, newY, diameter)) {
            var node = new Node(newX, newY, diameter);
            for(var j = 0; j < nodes.length; j++) {
                if(random(1) > 0.9) {
                    var cost = random(maxCost - 1) + 1;
                    node.edges.push([nodes[j], cost]);
                    nodes[j].edges.push([node, cost]);
                }
            }
            nodes.push(node);
            index++;
        }
    }
    connectAnyDisconnectedNodes();
    setUnvisited();
}

function draw() {
    background(0);

    for(var i = 0; i < nodes.length; i++) {
        nodes[i].drawEdges();
    }

    if(startNode && targetNode && routeFound) {
        drawRoute(startNode, targetNode);
    }

    for(var i = 0; i < nodes.length; i++) {
        nodes[i].show();
    }

    if(startNode) {
        startNode.c = color(10, 0, 100);
    }
    if(targetNode) {
        targetNode.c = color(10, 150, 0);
        targetNode.outline = color(0, 70, 0);
    }
    if(startNode && targetNode) {
        findRoute(startNode, targetNode);
    }
}

function isOverlapping(x, y, d) {
    for(var i = 0; i < nodes.length; i++) {
        if(dist(nodes[i].x, nodes[i].y, x, y) < nodes[i].d/2 + d/2 + 50) {
            return true;
        }
    }
    return false;
}

function setUnvisited() {
    unvisited = [];
    for(var i = 0; i < nodes.length; i++) {
        unvisited.push(nodes[i]);
    }
}

function connectAnyDisconnectedNodes() {
    for(var i = 0; i < nodes.length; i++) {
        if(nodes[i].edges.length == 0) {
            for(var j = 0; j < 2; j++){
                var cost = random(maxCost);
                // connecting it to a random node
                var randomNode = nodes[floor(random(nodes.length))];
                nodes[i].edges.push([randomNode, cost]);
                randomNode.edges.push([nodes[i], cost]);
                // nodes[i].edges.push([nodes[(i+1)%nodes.length], cost]);
                // nodes[(i+1)%nodes.length].edges.push([nodes[i], cost]);
            }
            // an edge to previous node
            if(i > 0) {
                var cost = random(maxCost);
                nodes[i].edges.push([nodes[i-1], cost]);
                nodes[i-1].edges.push([nodes[i], cost]);
            }
            
        }
    }
}

function mousePressed() {
    for(var i = 0; i < nodes.length; i++) {
        if(dist(nodes[i].x, nodes[i].y, mouseX, mouseY) < nodes[i].d/2) {
            if(startNode && targetNode) {
                clearRoute();
                startNode = nodes[i];
                startNode.inRoute = true;
            }
            else if(!startNode) {
                startNode = nodes[i];
                startNode.inRoute = true;
            } else {
                if(!(dist(startNode.x, startNode.y, mouseX, mouseY) < startNode.d/2)) {
                    targetNode = nodes[i];
                }
            }
        }
    }
}

function getDistance(a, b) {
    for(var i = 0; i < a.edges.length; i++) {
        if(a.edges[i][0] == b) {
            return a.edges[i][1];
        }
    }
    return Infinity;
}

function compareDistances(node1, node2) {
    var newDist = getDistance(node1, node2);
    if(floor(newDist + node1.distance) < floor(node2.distance)) {
        node2.distance = floor(newDist + node1.distance);
        node2.prev = node1;
    }
}

function computeNeighbours(node) {
    for(var i = 0; i < node.edges.length; i++) {
        compareDistances(node, node.edges[i][0]);
    }
}

function smallestDistance() {
    var distance = Infinity;
    var closestNode;
    for(var i = 0; i < unvisited.length; i++) {
        if(unvisited[i].distance < distance) {
            distance = unvisited[i].distance;
            closestNode = unvisited[i];
        }
    }
    return closestNode;
}

function isVisited(node) {
    for(var i = 0; i < unvisited.length; i++) {
        if(unvisited[i] == node) {
            return false;
        }
    }
    return true;
}

function makeVisited(node) {
    for(var i = 0; i < unvisited.length; i++) {
        if(unvisited[i] == node) {
            unvisited.splice(i, 1);
        }
    }
}

function findRoute(node1, node2) {
    routeFound = false;
    setUnvisited();
    startNode = node1;
    targetNode = node2;
    startNode.distance = 0;
    var currentNode = startNode;
    while(!isVisited(node2) || unvisited.length != 0) {
        computeNeighbours(currentNode);
        makeVisited(currentNode);
        currentNode = smallestDistance();
    }
    routeFound = true;
}

function drawRoute(start, target) {
    start.inRoute = true;
    target.inRoute = true;
    var currentNode = target;
    var prevNode;
    while(prevNode != start) {
        prevNode = currentNode.prev;
        if(prevNode) {
            prevNode.inRoute = true;
            stroke(0, 20, 200, 150);
            line(currentNode.x, currentNode.y, prevNode.x, prevNode.y);
            currentNode = prevNode;
        }
    }
}

function clearRoute() {
    startNode = undefined;
    targetNode = undefined;
    routeFound = false;
    for(var i = 0; i < nodes.length; i++) {
        nodes[i].inRoute = false;
        nodes[i].distance = Infinity;
        nodes[i].c = color(150, 0, 10);
        nodes[i].outline = color(0, 50, 200);
    }
    setUnvisited();
}