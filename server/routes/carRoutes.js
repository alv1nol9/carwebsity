const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const { isAdmin } = require('../middleware/auth');

// POST new car (admin only) — just saves data and Cloudinary URLs
router.post('/', isAdmin, async (req, res) => {
  try {
    const {
      make,
      model,
      year,
      price,
      description,
      mileage,
      drive,
      engineSize,
      fuelType,
      images // <-- array of Cloudinary URLs
    } = req.body;

    const newCar = new Car({
      make,
      model,
      year,
      price,
      description,
      mileage,
      drive,
      engineSize,
      fuelType,
      images, // save the URLs directly
    });

    await newCar.save();
    res.status(201).json(newCar);
  } catch (err) {
    console.error('Error adding car:', err);
    res.status(500).json({ message: err.message || 'Something went wrong' });
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

// ...your existing routes above...

// GET all unique brands (makes)
router.get('/brands', async (req, res) => {
  try {
    const brands = await Car.distinct('make');
    res.json(brands);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all unique models for a brand
router.get('/models', async (req, res) => {
  try {
    const { brand } = req.query;
    if (!brand) return res.json([]);
    const models = await Car.find({ make: brand }).distinct('model');
    res.json(models);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

