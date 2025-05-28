// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// Route imports
const carRoutes = require('./routes/carRoutes');
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/upload'); // We'll create this file

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});
app.use(cors());
app.use(express.json());

// --- Serve Uploaded Images ---
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- API Routes ---
app.use('/api/cars', carRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);

console.log('🔌 Mounted /api/cars, /api/auth, and /api/upload');

// --- Global Ping ---
app.get('/ping-global', (req, res) => {
  console.log('[global] /ping-global hit');
  return res.json({ pong: true });
});

// --- Connect to MongoDB and Start Server ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚗 Server running on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  });

console.log(process.env.JWT_SECRET);
