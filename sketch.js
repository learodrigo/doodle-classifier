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
  dogs_data     = loadBytes('data/dogs1000.bin')
  horses_data   = loadBytes('data/horses1000.bin')
  houses_data   = loadBytes('data/houses1000.bin')
  plants_data   = loadBytes('data/plants1000.bin')
  rainbows_data = loadBytes('data/rainbows1000.bin')
  trains_data   = loadBytes('data/trains1000.bin')
}

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

// Loads my data objects with testing and training
// data with the object label
function categoryPreparation (category, data, label) {
  category.training = []
  category.testing  = []
  for (let i = 0; i < TOTAL_DATA; i++) {
    let offset = i * IMG_SIZE_SQ
    let threshold = floor(0.8 * TOTAL_DATA)
    if (i < threshold) {
      category.training[i] = data.bytes.subarray(offset, offset + IMG_SIZE_SQ)
      category.training[i].label = label
    } else {
      category.testing[i - threshold] = data.bytes.subarray(offset, offset + IMG_SIZE_SQ)
      category.testing[i - threshold].label = label
    }
  }
}

// Runs categoryPreparation for each dataset
function dataPreparation () {
  categoryPreparation(cats, cats_data, CAT)
  categoryPreparation(dogs, dogs_data, DOG)
  categoryPreparation(horses, horses_data, HORSE)
  categoryPreparation(houses, houses_data, HOUSE)
  categoryPreparation(plants, plants_data, PLANT)
  categoryPreparation(rainbows, rainbows_data, RAINBOW)
  categoryPreparation(trains, trains_data, TRAIN)
}

// Loads training data
function trainingDataPreparation () {
  let training = []
  training = training.concat(cats.training)
  training = training.concat(dogs.training)
  training = training.concat(horses.training)
  training = training.concat(houses.training)
  training = training.concat(plants.training)
  training = training.concat(rainbows.training)
  training = training.concat(trains.training)
  return training
}

// Runs training
function trainingNN (nn) {
  // Getting array with all data to be trained
  // training now is a 2D array
  let training = trainingDataPreparation()
  // Shuffling training array
  shuffle(training, true)
  // Training nn for one epoch
  for (let i = 0; i < training.length; i++) {
    // Temp array for be used in the nn.train
    let data = training[i]
    // Filling inputs one-dimension array
    let inputs = data.map(x => x / 255)
    let label = training[i].label
    // One-hot encoding
    let targets = [0, 0, 0, 0, 0, 0, 0]
    targets[label] = 1
    // Train nn
    nn.train(inputs, targets)
  }
}

// Load testing data
function testingDataPreparation () {
  let testing = []
  testing = testing.concat(cats.testing)
  testing = testing.concat(dogs.testing)
  testing = testing.concat(horses.testing)
  testing = testing.concat(houses.testing)
  testing = testing.concat(plants.testing)
  testing = testing.concat(rainbows.testing)
  testing = testing.concat(trains.testing)
  return testing
}

// Runs testing and returns percentage
function testingNN (nn) {
  let testing = testingDataPreparation()
  let correct = 0
  // Training nn for one epoch
  for (let i = 0; i < testing.length; i++) {
    // Temp array for be used in the nn.train
    let data = testing[i]
    // Filling inputs one-dimension array
    let inputs = data.map(x => x / 255)
    let label = testing[i].label
    // Testing nn - predict
    let guess = nn.predict(inputs)
    // Getting the index of the biggest value
    let classification = guess.indexOf(max(guess))
    correct += (classification === label) ? 1 : 0
  }
  // Returning percentage of corrects
  return correct / testing.length
}

function setup () {
  createCanvas(CANVAS, CANVAS)
  background(51)
  dataPreparation()

  // 1. Total number of pixels per dataset
  // 2. 64 base analysis
  // 3. One output for each dataset
  nn = new NeuralNetwork(IMG_SIZE_SQ, 64, 7)
  // Running 5 times
  for (let i = 0; i < 5; i++) {
    trainingNN(nn)
    let percentage = testingNN(nn)
    print('Round', i + 1)
    print('Correct: %', percentage)
  }

  // Desbuggin data 28x28px
  printRawDataDebugger(cats_data)
}
