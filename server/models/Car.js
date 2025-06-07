const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  price: Number,
  mileage: Number,   // NEW
  drive: String,     // NEW (e.g., "4WD", "FWD", "RWD")
  fuelType: String,  // NEW (e.g., "Petrol", "Diesel", "Electric")
  images: [String],
  // description: String, // REMOVED
});

module.exports = mongoose.model('Car', carSchema);
