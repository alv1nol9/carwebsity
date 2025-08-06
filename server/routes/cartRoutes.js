const express = require('express');
const { auth } = require('../middleware/auth');
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');

const router = express.Router();

// Get current user's cart
router.get('/', auth, getCart);

// Add car to cart
router.post('/add', auth, addToCart);

// Remove car from cart
router.post('/remove', auth, removeFromCart);

module.exports = router;
