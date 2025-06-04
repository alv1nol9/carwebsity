const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../utils/cloudinary'); // use your configured storage

const upload = multer({ storage });

// Upload multiple images
router.post('/multiple', upload.array('images', 5), (req, res) => {
  // Cloudinary URLs will be in req.files
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded' });
  }
  const imageUrls = req.files.map(file => file.path);
  res.json({ imageUrls });
});

module.exports = router;
