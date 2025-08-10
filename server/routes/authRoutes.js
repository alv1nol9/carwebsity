// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
console.log('[authRoutes] module loaded');

const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { googleAuth } = require('../controllers/googleAuthController');

const JWT_SECRET = process.env.JWT_SECRET;

// Utility to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, isAdmin: user.isAdmin || false },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// --- Google OAuth Route ---
router.post('/google', googleAuth);

// --- Health-check Route ---
router.get('/ping', (req, res) => {
  console.log('[authRoutes] 🔔 ping hit');
  return res.json({ pong: true });
});

// --- Register Route ---
router.post(
  '/register',
  [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password with 6 or more characters is required').isLength({ min: 6 }),
  ],
  async (req, res) => {
    console.log('🟢 Register route hit');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('🔴 Validation errors');
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        console.log('🔴 User already exists');
        return res.status(400).json({ error: 'User already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user = new User({ name, email, password: hashedPassword });
      await user.save();

      const token = generateToken(user);

      console.log('✅ Registration successful');
      res.status(201).json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin || false,
        },
      });
    } catch (err) {
      console.error('🔥 Server error:', err);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// --- Login Route ---
router.post(
  '/login',
  [
    check('email', 'Valid email required').isEmail(),
    check('password', 'Password is required').notEmpty(),
  ],
  async (req, res) => {
    console.log('🟢 Login route hit');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('🔴 Validation errors');
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      console.log('🔵 Looking up user:', email);
      const user = await User.findOne({ email });

      if (!user) {
        console.log('🔴 User not found');
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        console.log('🔴 Invalid password');
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = generateToken(user);

      console.log('✅ Login successful');
      res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin || false,
        },
      });
    } catch (err) {
      console.error('🔥 Server error:', err);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

module.exports = router;
