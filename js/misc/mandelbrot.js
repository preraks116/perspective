var maxiterations = 0;
function setup() {
    createCanvas(720, 400);
    pixelDensity(1);
}

function draw() {
    maxiterations++;
    if(maxiterations == 40) {
        // stop the loop
        noLoop();
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
