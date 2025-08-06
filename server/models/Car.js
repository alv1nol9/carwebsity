const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  price: Number,
<<<<<<< HEAD
  mileage: Number,   
  drive: String,     
  fuelType: String,  
  images: [String],
=======
  image: String,          // for old code, keep it for now
  images: [String],       // new: multiple images
  description: String,
  inStock: { type: Boolean, default: true },
>>>>>>> kerrei/main
});

module.exports = mongoose.model('Car', carSchema);
