// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// Route imports
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/upload');
const cartRoutes = require('./routes/cartRoutes');
const carRoutes = require('./routes/carRoutes'); // ✅ FIXED: added missing import

const app = express();
const PORT = process.env.PORT || 5000;

console.log("🚀 This is the REAL backend, running from", __dirname);

// --- Middleware ---
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use(cors({
  origin: [
    'https://carwebsity.vercel.app',
    'https://carwebsity-ek3x4pdna-alv1nols-projects.vercel.app',
    'http://localhost:5173',
    "https://www.valleyroadmotors.co.ke"
  ],
  credentials: true,
  optionsSuccessStatus: 200,
}));

app.use(express.json());
app.options('*', cors());

// --- Serve Uploaded Images ---

// (optional static serve setup can go here if needed)
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- API Routes ---
app.use('/api/cars', carRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/cart', cartRoutes);

console.log('🔌 Mounted /api/cars, /api/auth, and /api/upload');

// --- Base Route ---
app.get('/', (req, res) => {
  res.send('Welcome to the Carwebsity API!');
});

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

console.log(process.env.JWT_SECRET); // You may want to remove this in production
