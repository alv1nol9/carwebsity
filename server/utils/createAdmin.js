const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const User = require('../models/User'); // we’ll create this model below

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const email = 'admin@example.com';
    const password = 'admin123';

    const existing = await User.findOne({ email });
    if (existing) {
      console.log('❗Admin already exists.');
      return mongoose.disconnect();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new User({
      email,
      password: hashedPassword,
      isAdmin: true,
    });

    await admin.save();
    console.log('✅ Admin user created!');
    mongoose.disconnect();
  })
  .catch(err => console.error('❌ DB connection failed:', err));
