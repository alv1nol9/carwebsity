const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  price: Number,
  image: String,          // for old code, keep it for now
  images: [String],       // new: multiple images
  description: String,
  inStock: { type: Boolean, default: true },
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
