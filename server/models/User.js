const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }]
});

module.exports = mongoose.model('User', userSchema);
