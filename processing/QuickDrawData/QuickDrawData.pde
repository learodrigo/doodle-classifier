// To run processing sketch and get the data
// download the whole file that you need on
// https://console.cloud.google.com/storage/browser/quickdraw_dataset?pli=1
// and modify processing program to get them
// Each dataset is like 100MB...

size(280, 280);

// Loading the dataset and print the length
byte[] data = loadBytes("DATASETNAMEHERE.npy");

// Images are 28x28px = 784
// Picking 100 images
int total = 1000;
int imgSize = 28;
int imgTotalPixels = imgSize * imgSize;

// Setting output handlers
byte[] outData = new byte[total * imgTotalPixels];
int outIndex = 0;

for (int n = 0; n < total; n++) {
  // pny files have 80 digits before the actual data
  int start = 80 + n * 784;
  // This will be used to store the pixels of the image
  PImage img = createImage(imgSize, imgSize, RGB);
  img.loadPixels();
  for (int i = 0; i < imgTotalPixels; i++) {
    // Offsetting
    int index = i + start;
    // Getting value for specific point
    byte val = data[index];
    // Adding the value to the output array
    outData[outIndex] = val;
    // Updating outIndex
    outIndex++;
    // Setting the color for visualization
    img.pixels[i] = color(255 - val & 0xff);
  }
  img.updatePixels();
  // Placing each image in the correct spot
  int x = imgSize * (n % 10);
  int y = imgSize * (n / 10);
  image(img, x, y);
}

// .bin stands for binary
// Checkout that the number here is the same as int total
saveBytes("DATASETNAMEHERE1000.bin", outData);
