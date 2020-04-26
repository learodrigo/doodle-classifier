let cats, dogs, horses, houses, plants, rainbows, trains;

function preload () {
  cats     = loadBytes('data/cats1000.bin')
  dogs     = loadBytes('data/dogs1000.bin')
  horses   = loadBytes('data/horses1000.bin')
  houses   = loadBytes('data/houses1000.bin')
  plants   = loadBytes('data/plants1000.bin')
  rainbows = loadBytes('data/rainbows1000.bin')
  trains   = loadBytes('data/trains1000.bin')
}

function setup () {
  createCanvas(280, 280)
  background(51)
  print(cats,
        dogs,
        horses,
        houses,
        plants,
        rainbows,
        trains)
}
