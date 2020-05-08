// Loads training data
function trainingDataPreparation () {
  return [].concat(cats.training)
    .concat(rainbows.training)
    .concat(trains.training)
    .concat(dogs.training)
    .concat(horses.training)
    .concat(houses.training)
    .concat(plants.training)
}

// Runs training
function trainingNN (nn) {
  // Getting array with all data to be trained
  // training now is a 2D array
  const training = trainingDataPreparation()
  // Shuffling training array
  shuffle(training, true)
  // Training nn for one epoch
  for (let i = 0; i < training.length; i++) {
    // Temp array for be used in the nn.train
    let data = training[i]
    // Filling inputs one-dimension array
    let inputs = Array.from(data).map(x => x / 255)
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
  return [].concat(cats.testing)
    .concat(rainbows.testing)
    .concat(trains.testing)
    .concat(dogs.testing)
    .concat(horses.testing)
    .concat(houses.testing)
    .concat(plants.testing)
}

// Runs testing and returns percentage
function testingNN (nn) {
  const testing = testingDataPreparation()
  let correct = 0
  // Training nn for one epoch
  for (let i = 0; i < testing.length; i++) {
    // Temp array for be used in the nn.train
    let data = testing[i]
    // Filling inputs one-dimension array
    let inputs = Array.from(data).map(x => x / 255);
    let label = data.label
    // Testing nn - predict
    let guess = nn.predict(inputs)
    // Getting the index of the biggest value
    let m = max(guess)
    let classification = guess.indexOf(m)
    correct += (classification === label) ? 1 : 0
  }
  // Returning percentage of corrects
  return 100 * correct / testing.length
}
