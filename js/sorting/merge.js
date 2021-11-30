let values = [];
let colors = [];
let startSort = true;

function mergeSort(a) {
    // create copy of the array 
    copy = a.slice()
    // asynchronous sort the copy
    mergeSortSlice(copy, 0, copy.length);
    return;
}

function resetColor()
{
    
}

async function mergeSortSlice(a, start, end) {
    // adding color to the sorted part

    // if the array is of size 1, it is sorted
    if (end - start <= 1)
        return;

    var mid = Math.round((end + start) / 2);

    // wait till divides are sort 
    await mergeSortSlice(a, start, mid);
    await mergeSortSlice(a, mid, end);

    // merge divides
    let i = start,
        j = mid;
    for (let k = i; k < j+1; k++) {
        colors[k] = 0;
    }
    // add color

    while (i < end && j < end) {
        if (a[i] > a[j]) {
            let t = a[j];
            a.splice(j, 1);
            a.splice(i, 0, t);
            j++;
        }
        i++;
        if (i == j) j++;

        // copy back the current state of the sorting
        values = a.slice();

        // slow down
        await sleep(100);
    }

}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function setup() {
    createCanvas(720, 400);
    for (let i = 0; i < numOfRects; i++) {
        colors.push(-1);
    }
    rectWidth = floor(width / numOfRects);
    values = new Array(floor(width / rectWidth));
    for (let i = 0; i < values.length; i++) {
        values[i] = random(height);
    }
    //    frameRate(60);
}

let numOfRects = 60;
let rectWidth;

function draw() {
    if (startSort) {
        startSort = false;
        mergeSort(values);
    }

    background(0);
    stroke(255);

    for (let i = 0; i < values.length; i++) {
        // adding color
        if (colors[i] == 1) {
            fill(255, 0, 0);
        } else if (colors[i] == 0) {
            fill(0, 255, 0);
        } else {
            fill(0,0,255);
        }
        rect(i * rectWidth, height - values[i], rectWidth, values[i]);
    }
}