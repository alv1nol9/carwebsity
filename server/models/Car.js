const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  price: Number,
  image: String,
  description: String
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
