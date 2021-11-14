let values = [];
let i = 0;
let j = 0;

// The statements in the setup() function
// execute once when the program begins
// The array is filled with random values in setup() function.
function setup() {
  createCanvas(720, 400);
  for(let i = 0;i<width/9;i++){
    values.push(random(height));
  }
}

// The statements in draw() function are executed until the
// program is stopped. Each statement is executed in
// sequence and after the last line is read, the first
// line is executed again.
function draw() {
  background(0);
  stroke(255);
  bubbleSort();
  simulateSorting();
}

// The bubbleSort() function sorts taking 8 elements of the array
// per frame. The algorithm behind this function is 
// bubble sort.
function bubbleSort() {
  for(let k = 0;k<8;k++){
    if(i<values.length){
      let temp = values[j];
      if(values[j] > values[j+1]){
        values[j] = values[j+1];
        values[j+1] = temp;
      }
      j++;
      
      if(j>=values.length-i-1){
        j = 0;
        i++;
      }
    }
    else{
      noLoop();
    }
  }
}

// The simulateSorting() function helps in animating
// the whole bubble sort algorithm
// by drawing the rectangles using values
// in the array as the length of the rectangle.
function simulateSorting(){
  for(let i = 0;i<values.length;i++){
    fill(12,23,133);
    stroke(255, 255, 255);
    rect(i*8 , height, 7, -values[i],0);
   }
}