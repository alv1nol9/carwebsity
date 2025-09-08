const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET;

async function googleAuth(req, res) {
  const { credential } = req.body;
  if (!credential) return res.status(400).json({ error: "Missing Google credential" });

  try {
    // Verify token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;
    const name = payload.name; // ✅ get user’s Google name

    if (!email) return res.status(400).json({ error: "No email in Google payload" });

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new Google user
      user = new User({
        name: name || "Google User",
        email,
        provider: "google",
        isAdmin: false, // default non-admin
      });
      await user.save();
    }

    // Create JWT with role info
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, isAdmin: user.isAdmin, name: user.name });
  } catch (err) {
    console.error("Google OAuth error:", err);
    res.status(401).json({ error: "Invalid Google credential" });
  }
}

module.exports = { googleAuth };
