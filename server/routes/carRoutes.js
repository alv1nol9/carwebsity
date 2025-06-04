const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const { isAdmin } = require('../middleware/auth');
const multer = require('multer');
const { storage } = require('../utils/cloudinary');
const upload = multer({ storage });

// POST new car with image upload (admin only)
router.post('/', isAdmin, upload.array('images', 5), async (req, res) => {
  console.log('🔥 Cloudinary route hit');
console.log('📂 req.files =', req.files);

  try {
    const { make, model, year, price, description } = req.body;
    const imageUrls = req.files.map(file => file.path);

    const newCar = new Car({
      make,
      model,
      year,
      price,
      description,
      images: imageUrls,
    });

    await newCar.save();
    res.status(201).json(newCar);
  } catch (err) {
    console.error('Error adding car:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// GET all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific car by ID
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a car (admin only)
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json({ message: 'Car deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
