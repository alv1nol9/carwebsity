const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ dest: 'uploads/' });

router.post('/multiple', upload.array('images', 8), (req, res) => {
  const files = req.files.map(file => '/uploads/' + file.filename);
  res.json({ images: files });
});

module.exports = router;
