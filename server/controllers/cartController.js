const User = require('../models/User');
const Car = require('../models/Car');

// Get user's cart
async function getCart(req, res) {
  try {
    const user = await User.findById(req.user.userId).populate('cart');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ cart: user.cart });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

// Add car to cart
async function addToCart(req, res) {
  const { carId } = req.body;
  if (!carId) return res.status(400).json({ error: 'Missing carId' });
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (!user.cart.includes(carId)) user.cart.push(carId);
    await user.save();
    res.json({ cart: user.cart });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

// Remove car from cart
async function removeFromCart(req, res) {
  const { carId } = req.body;
  if (!carId) return res.status(400).json({ error: 'Missing carId' });
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.cart = user.cart.filter(id => id.toString() !== carId);
    await user.save();
    res.json({ cart: user.cart });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { getCart, addToCart, removeFromCart };
