var canvas;

function setup(){
  canvas = createCanvas(windowWidth,windowHeight);
  canvas.position(0,0);
  canvas.style('z-index','-1');
}

// the parameter at which x and y depends is usually taken as either t or symbol of theta
let t = 0;
let j = 0;
function draw(){
  background(0);
  translate(width/2,height/2);
  // stroke('#fff');
  // strokeWeight(2.5);
  //loop for adding 100 lines
  strokeWeight(5);
  stroke(12,23,133);
  for(let i = 0;i<69;i++){
    line(x1(t+i*2),y1(t+i*2),x2(t+i)+20,y2(t+i*3)+20);
  }
  t+=0.15;
}
// function to change initial x co-ordinate of the line
function x1(t){
  return sin(t/10)*145+sin(t/20)*145+sin(t/30)*145;
}

// function to change initial y co-ordinate of the line
function y1(t){
  return cos(t/10)*145+cos(t/20)*145+cos(t/30)*145;
}

// function to change final x co-ordinate of the line
function x2(t){
  return sin(t/15)*145+sin(t/25)*145+sin(t/35)*145;
}

// function to change final y co-ordinate of the line
function y2(t){
  return cos(t/15)*145+cos(t/25)*145+cos(t/35)*145;
}