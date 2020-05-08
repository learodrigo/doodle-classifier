// Loads training data
function trainingDataPreparation () {
  let training = []
  training = training.concat(cats.training)
  // training = training.concat(dogs.training)
  // training = training.concat(horses.training)
  // training = training.concat(houses.training)
  // training = training.concat(plants.training)
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
  // testing = testing.concat(dogs.testing)
  // testing = testing.concat(horses.testing)
  // testing = testing.concat(houses.testing)
  // testing = testing.concat(plants.testing)
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
  return 100 * correct / testing.length
}
