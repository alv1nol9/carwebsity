const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const client = new OAuth2Client();
const JWT_SECRET = process.env.JWT_SECRET;

// POST /api/auth/google
async function googleAuth(req, res) {
  const { credential } = req.body;
  if (!credential) return res.status(400).json({ error: 'Missing Google credential' });

  try {
    // Verify Google token
    const ticket = await client.verifyIdToken({ idToken: credential });
    const payload = ticket.getPayload();
    const email = payload.email;
    if (!email) return res.status(400).json({ error: 'No email in Google payload' });

    // Find or create user
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, password: 'GOOGLE_OAUTH', isAdmin: false });
      await user.save();
    }

    // Create JWT
    const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin || false }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Google OAuth error:', err);
    res.status(401).json({ error: 'Invalid Google credential' });
  }
}

module.exports = { googleAuth };
