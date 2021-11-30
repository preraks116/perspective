// // Daniel Shiffman
// // http://codingtra.in
// // http://patreon.com/codingtrain
// // Code for: https://youtu.be/6z7GQewK-Ks

// var minval = -0.5;
// var maxval = 0.5;

// var minSlider;
// var maxSlider;

// var frDiv;

// function setup() {
//   createCanvas(800, 900);
//   pixelDensity(1);

//   minSlider = createSlider(-2.5, 0, -2.5, 0.01);
//   maxSlider = createSlider(0, 2.5, 2.5, 0.01);

//   frDiv = createDiv('');
// }

// function draw() {
//   var maxiterations = 30;

//   loadPixels();
//   for (var x = 0; x < width; x++) {
//     for (var y = 0; y < height; y++) {
//       var a = map(x, 0, width, minSlider.value(), maxSlider.value());
//       var b = map(y, 0, height, minSlider.value(), maxSlider.value());

//       var ca = a;
//       var cb = b;

//       var n = 0;

//       while (n < maxiterations) {
//         var aa = a * a - b * b;
//         var bb = 2 * a * b;
//         a = aa + ca;
//         b = bb + cb;
//         if (a * a + b * b > 16) {
//           break;
//         }
//         n++;
//       }

//       var bright = map(n, 0, maxiterations, 0, 1);
//       bright = map(sqrt(bright), 0, 1, 0, 255);

//       if (n == maxiterations) {
//         bright = 0;
//       }

//       var pix = (x + y * width) * 4;
//       pixels[pix + 0] = bright;
//       pixels[pix + 1] = bright;
//       pixels[pix + 2] = bright;
//       pixels[pix + 3] = 255;
//     }
//   }
//   updatePixels();

//   frDiv.html(floor(frameRate()));
// }

var minval = -0.5;
var maxval = 0.5;

var minSlider;
var maxSlider;

var frDiv;
var maxiterations = 0;
function setup() {
    createCanvas(720, 400);
    pixelDensity(1);

    frDiv = createDiv('');
}

function draw() {
    maxiterations++;
    if(maxiterations == 30) {
        maxiterations = 0;
    }
    frameRate(2);
    loadPixels();
    // position it in the middle of the canvas

    // iterate over every pixel
    for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {
            // calculate the real and imaginary components
            var a = map(i - 70, 0, width, -2.5, 2.5);
            var b = map(j, 0, height, -2.5, 2.5);
            // calculate the initial real and imaginary components
            var ca = a;
            var cb = b;
            // calculate the number of iterations
            var n = 0;
            // iterate until the number of iterations reaches the max
            while (n < maxiterations) {
                // calculate the real and imaginary components
                var aa = a * a - b * b;
                var bb = 2 * a * b;
                // calculate the real and imaginary components
                a = aa + ca;
                b = bb + cb;
                // check if the number of iterations has reached the max
                if (a * a + b * b > 16) {
                    break;
                }
                n++;
            }
            //set the color of the pixel
            var bright = map(n, 0, maxiterations, 0, 255);
            bright = constrain(bright, 0, 255);
            var pix = (i + j * width) * 4;
            pixels[pix + 0] = bright;
            pixels[pix + 1] = bright;
            pixels[pix + 2] = bright;
            pixels[pix + 3] = 255;


        }
    }
    updatePixels();
}
