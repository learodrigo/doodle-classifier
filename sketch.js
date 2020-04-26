// Canvas size
const IMG_SIZE = 28
const IMG_SIZE_SQ = 784
const CANVAS = 280
const TOTAL_DATA = 1000
// Raw data
let cats_data, dogs_data, horses_data, houses_data, plants_data, rainbows_data, trains_data;
// Training data
let cats = {}, dogs = {}, horses = {}, houses = {}, plants = {}, rainbows = {}, trains = {};

function preload () {
  print('********************************')
  print('run "python3 -m http.server"')
  print('********************************')
  cats_data     = loadBytes('data/cats1000.bin')
  dogs_data     = loadBytes('data/dogs1000.bin')
  horses_data   = loadBytes('data/horses1000.bin')
  houses_data   = loadBytes('data/houses1000.bin')
  plants_data   = loadBytes('data/plants1000.bin')
  rainbows_data = loadBytes('data/rainbows1000.bin')
  trains_data   = loadBytes('data/trains1000.bin')
}

function printRawDataDebugger (data) {
  const TOTAL = 100;
  for (let n = 0; n < TOTAL; n++) {
    let img = createImage(IMG_SIZE, IMG_SIZE)
    img.loadPixels()
    let offset = n * IMG_SIZE_SQ
    for (var i = 0; i < IMG_SIZE_SQ; i++) {
      let val = 255 - data.bytes[i + offset]
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

function categoryPreparation (category, data) {
  category.training = []
  category.testing  = []
  for (let i = 0; i < TOTAL_DATA; i++) {
    let offset = i * IMG_SIZE_SQ
    let threshold = floor(0.8 * TOTAL_DATA)
    if (i < threshold) {
      category.training[i] = data.bytes.subarray(offset, offset + IMG_SIZE_SQ)
    } else {
      category.testing[i - threshold] = data.bytes.subarray(offset, offset + IMG_SIZE_SQ)
    }
  }
}

function dataPreparation () {
  categoryPreparation(cats, cats_data)
  categoryPreparation(dogs, dogs_data)
  categoryPreparation(horses, horses_data)
  categoryPreparation(houses, houses_data)
  categoryPreparation(plants, plants_data)
  categoryPreparation(rainbows, rainbows_data)
  categoryPreparation(trains, trains_data)
}

function setup () {
  createCanvas(CANVAS, CANVAS)
  background(51)
  dataPreparation()
  print(cats)

  // Desbuggin data 28x28px
  printRawDataDebugger(cats_data)
}
