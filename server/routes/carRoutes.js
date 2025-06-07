const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const { isAdmin } = require('../middleware/auth');

// POST new car (admin only)
router.post('/', isAdmin, async (req, res) => {
  try {
    const {
      make,
      model,
      year,
      price,
      mileage,
      drive,
      fuelType,
      images // array of Cloudinary URLs
    } = req.body;

    const newCar = new Car({
      make,
      model,
      year,
      price,
      mileage,
      drive,
      fuelType,
      images,
    });

    await newCar.save();
    res.status(201).json(newCar);
  } catch (err) {
    console.error('Error adding car:', err);
    res.status(500).json({ message: err.message || 'Something went wrong' });
  }
});

// GET all cars, with filtering by query params
router.get('/', async (req, res) => {
  try {
    const {
      make,
      model,
      year,
      minPrice,
      maxPrice,
      minMileage,
      maxMileage,
      drive,
      fuelType
    } = req.query;

    // Build the filter object
    let filter = {};

    if (make) filter.make = make;
    if (model) filter.model = model;
    if (year) filter.year = Number(year);

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (minMileage || maxMileage) {
      filter.mileage = {};
      if (minMileage) filter.mileage.$gte = Number(minMileage);
      if (maxMileage) filter.mileage.$lte = Number(maxMileage);
    }
    if (drive) filter.drive = drive;
    if (fuelType) filter.fuelType = fuelType;

    const cars = await Car.find(filter);
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

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
