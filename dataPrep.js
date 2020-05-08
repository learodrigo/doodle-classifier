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
  categoryPreparation(rainbows, rainbows_data, RAINBOW)
  categoryPreparation(trains, trains_data, TRAIN)
  categoryPreparation(dogs, dogs_data, DOG)
  categoryPreparation(horses, horses_data, HORSE)
  categoryPreparation(houses, houses_data, HOUSE)
  categoryPreparation(plants, plants_data, PLANT)
}
