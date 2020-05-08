// constansts
const CANVAS = 280
const IMG_SIZE = 28
const IMG_SIZE_SQ = 784
const TOTAL_DATA = 1000
// Outputs from NN will be map with these values
const CAT = 0
const DOG = 1
const HORSE = 2
const HOUSE = 3
const PLANT = 4
const RAINBOW = 5
const TRAIN = 6

// Raw data
let cats_data, dogs_data, horses_data, houses_data, plants_data, rainbows_data, trains_data;
// Training data
let cats = {}, dogs = {}, horses = {}, houses = {}, plants = {}, rainbows = {}, trains = {};
// Neural network
let nn

function preload () {
  cats_data     = loadBytes('data/cats1000.bin')
  // dogs_data     = loadBytes('data/dogs1000.bin')
  // horses_data   = loadBytes('data/horses1000.bin')
  // houses_data   = loadBytes('data/houses1000.bin')
  // plants_data   = loadBytes('data/plants1000.bin')
  rainbows_data = loadBytes('data/rainbows1000.bin')
  trains_data   = loadBytes('data/trains1000.bin')
}

function setup () {
  createCanvas(CANVAS, CANVAS)
  background(255)
  console.clear()
  dataPreparation()

  // 1. Total number of pixels per dataset
  // 2. 64 base analysis
  // 3. One output for each dataset
  nn = new NeuralNetwork(IMG_SIZE_SQ, 64, 7)

  // Training button handler
  let counter = 0
  train.addEventListener('click', () => {
    print('Training...')
    trainingNN(nn)
    console.clear()
    counter++
    print('Round:', counter)
  })
  // Testing button handler
  test.addEventListener('click', () => {
    print('Testing...')
    let percentage = testingNN(nn)
    console.clear()
    print('Correct: %', nf(percentage, 2, 2))
  })
  // Guessing button handler
  guess.addEventListener('click', () => {
    // To hold the pixels to test
    let inputs = []
    // get() returns a copy of the canvas
    let img = get()
    img.resize(IMG_SIZE, IMG_SIZE)
    img.loadPixels()
    // Looping for each pixel
    // As p5js handles each pixel with rgba values, we have to skip those 3 extra spots
    for (let i = 0; i < IMG_SIZE_SQ; i += 4) {
      // As colors aren't being handle here, we only need the alpha value
      let bright = img.pixels[i * 4]
      // Normalizing values from 0 to 1 to match dataset (we did 255 - x there too)
      inputs[i] = (255 - bright) / 255
    }
    img.updatePixels()
    let guess = nn.predict(inputs)
    let m = max(guess)
    let classification = guess.indexOf(m)
    switch (classification) {
      case CAT:
        print('CAT')
        break;
      case DOG:
        print('DOG')
        break;
      case HORSE:
        print('HORSE')
        break;
      case HOUSE:
        print('HOUSE')
        break;
      case PLANT:
        print('PLANT')
        break;
      case RAINBOW:
        print('RAINBOW')
        break;
      case TRAIN:
        print('TRAIN')
        break;
      default:
    }
  })

  // Desbuggin data 28x28px
  // printRawDataDebugger(cats_data)
}

function draw () {
  strokeWeight(8)
  stroke(51)
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY)
  }
}
