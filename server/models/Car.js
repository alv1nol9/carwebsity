const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  price: Number,
  mileage: Number,   
  drive: String,     
  fuelType: String,  
  images: [String],
});

module.exports = mongoose.model('Car', carSchema);
