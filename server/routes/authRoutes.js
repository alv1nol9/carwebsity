// server/routes/authRoutes.js
const express = require('express');
const router = express.Router(); // ✅ Moved this to the top
console.log('[authRoutes] module loaded');

const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { googleAuth } = require('../controllers/googleAuthController');

const JWT_SECRET = process.env.JWT_SECRET;

// POST /api/auth/google (Google OAuth sign-in/register)
router.post('/google', googleAuth);

// Health-check ping route
router.get('/ping', (req, res) => {
  console.log('[authRoutes] 🔔 ping hit');
  return res.json({ pong: true });
});

// POST /api/auth/login
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
      console.log('🟠 User lookup result:', user);

      if (!user) {
        console.log('🔴 User not found');
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const match = await bcrypt.compare(password, user.password);
      console.log('🟡 Password match:', match);

      if (!match) {
        console.log('🔴 Invalid password');
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const payload = { userId: user._id, isAdmin: user.isAdmin || false };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

      console.log('✅ Login successful, sending token');
      res.json({ token });
    } catch (err) {
      console.error('🔥 Server error:', err);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

module.exports = router;
