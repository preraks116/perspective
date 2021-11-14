let values = [];
let i = 0;
let j = 0;
let x = 0;
let y = 0;

// initial setup of the canvas
function setup() {
  createCanvas(720, 400);
  for(let i = 0;i<width/9;i++){
    values.push(random(height));
  }
}

// executed to draw each frame
function draw() {
  background(0);
  stroke(255);
  bubbleSort();
  simulateSorting();
}

// performs every step of the bubble sort
function bubbleSort() {
    let temp = values[j];
    if(values[j] > values[j+1]){
      values[j] = values[j+1];
      values[j+1] = temp;
      x = j;
      y = j+1;
    }
    j++;
    if(j>=values.length-1){
      j = 0;
    }
}

// displays every frame
function simulateSorting(){
  for(let i = 0;i<values.length;i++){
    
    if(i == x || i == y){
      stroke(255, 255, 255);
      fill(255, 255, 255);
    }
    else{
      stroke(255, 255, 255);
      fill(12,23,133);
    }
    rect(i*8 , height, 7, -values[i],0);
   }
}