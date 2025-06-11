
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();
console.log('Loaded MONGO_URI:', process.env.MONGO_URI);

const User = require('./models/User');

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🔌 Connected to MongoDB');

    const hash = await bcrypt.hash('Password123!', 10);

    const admin = await User.findOneAndUpdate(
      { email: 'admin@example.com' },
      { email: 'admin@example.com', password: hash, isAdmin: true },
      { upsert: true, new: true }
    );

    console.log('✅ Admin user seeded:', {
      email: admin.email,
      password: 'Password123!',
    });
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedAdmin();
