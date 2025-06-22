const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../utils/cloudinary');

const upload = multer({ storage });

router.post('/multiple', upload.array('images', 5), async (req, res) => {
  try {
    console.log('📥 Upload endpoint hit');
    console.log('🧾 req.body:', req.body);
    console.log('🖼️ req.files:', req.files);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const imageUrls = req.files.map(file => file.path);
    return res.status(200).json({ imageUrls });
  } catch (err) {
    console.error('💥 Upload failed:', err);
    return res.status(500).json({ message: 'Upload error', error: err.message });
  }
});

module.exports = router;
