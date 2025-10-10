// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

// Route imports
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/upload");
const cartRoutes = require("./routes/cartRoutes");
const carRoutes = require("./routes/carRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

console.log("🚀 Backend running from", __dirname);

// --- Middleware ---
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

const allowedOrigins = [
  'https://carwebsity.vercel.app',
  'https://carwebsity-ek3x4pdna-alv1nols-projects.vercel.app',
  'http://localhost:5173',
  'https://www.valleyroadmotors.co.ke',
  'https://valleyroadmotors.co.ke'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like curl or Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));


app.use(express.json());
app.options("*", cors());

// --- API Routes ---
app.use("/api/cars", carRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/cart", cartRoutes);

console.log("🔌 Mounted /api routes");

// --- Base Route ---
app.get("/ping-global", (req, res) => {
  console.log("[global] /ping-global hit");
  return res.json({ pong: true });
});

// --- Serve Uploaded Images (if needed) ---
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- Serve Frontend Build (React) ---
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

// Catch-all → send React index.html for non-API routes
app.get("*", (req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(404).json({ message: "API route not found" });
  }
  res.sendFile(path.join(frontendPath, "index.html"));
});

// --- Connect to MongoDB and Start Server ---
console.log("🔑 MONGO_URI from env:", process.env.MONGO_URI ? "Loaded" : "Missing");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`🚗 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });

// ⚠️ Remove this in production for security
// console.log(process.env.JWT_SECRET);
