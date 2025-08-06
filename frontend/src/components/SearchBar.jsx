import React, { useState, useEffect } from 'react';
import '../styles/searchbar.css'

const driveOptions = ["", "4WD", "FWD", "RWD"];
const fuelTypes = ["", "Petrol", "Diesel", "Electric"];

const budgetRanges = [
<<<<<<< HEAD
  
  { label: '500K - 1M', min: 500000, max: 1000000 },
  { label: '1M - 2M', min: 1000000, max: 2000000 },
  { label: '2M - 3M', min: 2000000, max: 3000000 },
  { label: '3M - 5M', min: 3000000, max: 5000000 },
  { label: '5M - 10M', min: 5000000, max: 10000000 },
  { label: 'Above 10M', min: 10000000, max: undefined },
=======
  { label: '1M - 2M', value: '1M-2M' },
  { label: '2M - 3M', value: '2M-3M' },
  { label: '3M - 5M', value: '3M-5M' },
  { label: '5M - 10M', value: '5M-10M' },
  { label: 'Above 10M', value: '10M+' },
>>>>>>> kerrei/main
];

export default function SearchBar({ onSearch }) {
  // For dynamic makes/models from API
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);

  // Form state
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minMileage, setMinMileage] = useState('');
  const [maxMileage, setMaxMileage] = useState('');
  const [drive, setDrive] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Fetch all makes on mount
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/cars/brands`)
      .then(res => res.json())
      .then(data => setMakes(data));
  }, []);

  // Fetch models when make changes
  useEffect(() => {
    if (!make) {
      setModels([]);
      setModel('');
      return;
    }
    fetch(`${import.meta.env.VITE_API_URL}/api/cars/models?brand=${make}`)
      .then(res => res.json())
      .then(data => setModels(data));
  }, [make]);

  const handleBudgetClick = (range) => {
    setSelectedBudget(range.label);
    setMinPrice(range.min || '');
    setMaxPrice(range.max || '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filters = {
      make,
      model,
      year,
      minPrice,
      maxPrice,
      minMileage,
      maxMileage,
      drive,
      fuelType,
    };
    if (onSearch) onSearch(filters);
  };

  return (
    <aside className="car-search-sidebar">
      <form onSubmit={handleSubmit}>
        {/* Brand/Make */}
        <div className="search-section">
          <label>Brand</label>
          <select value={make} onChange={e => setMake(e.target.value)}>
            <option value="">All</option>
            {makes.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* Model */}
        <div className="search-section">
          <label>Model</label>
          <select value={model} onChange={e => setModel(e.target.value)} disabled={!models.length}>
            <option value="">All</option>
            {models.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* Year */}
        <div className="search-section">
          <label>Year</label>
          <input
            type="number"
            placeholder="e.g. 2017"
            value={year}
            onChange={e => setYear(e.target.value)}
            min="1990"
            max={new Date().getFullYear()}
          />
        </div>

        {/* Budget quick buttons */}
        <div className="search-section">
          <label>Quick Budget</label>
          <div className="budget-buttons">
            {budgetRanges.map(range => (
              <button
                type="button"
                key={range.label}
                className={selectedBudget === range.label ? 'selected' : ''}
                onClick={() => handleBudgetClick(range)}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Min/Max Price manual */}
        <div className="search-section">
          <label>Custom Price (KES)</label>
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={e => {
              setMinPrice(e.target.value);
              setSelectedBudget('');
            }}
            min="0"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={e => {
              setMaxPrice(e.target.value);
              setSelectedBudget('');
            }}
            min="0"
          />
        </div>

        {/* Advanced Search Toggle */}
        <div className="search-section">
          <button
            type="button"
            className="advanced-toggle"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? 'Hide Advanced Search ▲' : 'Click here for Advanced search ▼'}
          </button>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <>
            {/* Mileage */}
            <div className="search-section">
              <label>Mileage (km)</label>
              <input
                type="number"
                placeholder="Min Mileage"
                value={minMileage}
                onChange={e => setMinMileage(e.target.value)}
                min="0"
              />
              <input
                type="number"
                placeholder="Max Mileage"
                value={maxMileage}
                onChange={e => setMaxMileage(e.target.value)}
                min="0"
              />
            </div>

            {/* Drive */}
            <div className="search-section">
              <label>Drive</label>
              <select value={drive} onChange={e => setDrive(e.target.value)}>
                {driveOptions.map(opt => (
                  <option key={opt} value={opt}>{opt || "All"}</option>
                ))}
              </select>
            </div>

            {/* Fuel Type */}
            <div className="search-section">
              <label>Fuel Type</label>
              <select value={fuelType} onChange={e => setFuelType(e.target.value)}>
                {fuelTypes.map(ft => (
                  <option key={ft} value={ft}>{ft || "All"}</option>
                ))}
              </select>
            </div>
          </>
        )}

        <button type="submit" className="search-btn">Search</button>
      </form>
    </aside>
  );
}
