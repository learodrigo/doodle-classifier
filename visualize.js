// Renders a 10x10 grid with given dataset
function printRawDataDebugger (dataset) {
  const TOTAL = 100;
  for (let n = 0; n < TOTAL; n++) {
    let img = createImage(IMG_SIZE, IMG_SIZE)
    img.loadPixels()
    let offset = n * IMG_SIZE_SQ
    for (var i = 0; i < IMG_SIZE_SQ; i++) {
      let val = 255 - dataset.bytes[i + offset]
      img.pixels[i * 4 + 0] = val
      img.pixels[i * 4 + 1] = val
      img.pixels[i * 4 + 2] = val
      img.pixels[i * 4 + 3] = 255
    }
    img.updatePixels()
    let x = (n % 10) * IMG_SIZE
    let y = floor(n / 10) * IMG_SIZE
    image(img, x, y)
  }
}
