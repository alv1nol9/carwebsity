import React, { useEffect, useState } from 'react';
import CarGrid from './CarGrid';
import SearchBar from './SearchBar';

const budgetRanges = [
  { value: '0-500K', min: 0, max: 500_000 },
  { value: '500K-1M', min: 500_000, max: 1_000_000 },
  { value: '1M-2M', min: 1_000_000, max: 2_000_000 },
  { value: '2M-3M', min: 2_000_000, max: 3_000_000 },
  { value: '3M-5M', min: 3_000_000, max: 5_000_000 },
  { value: '5M-10M', min: 5_000_000, max: 10_000_000 },
  { value: '10M+', min: 10_000_000, max: Infinity },
];

const getBudgetRange = (budgetValue) => {
  return budgetRanges.find(r => r.value === budgetValue) || null;
};

const CarsPage = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/cars`)
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setFilteredCars(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching cars:', err);
        setLoading(false);
      });
  }, []);

  const handleSearch = (filters) => {
    let filtered = [...cars];

    // Keyword (checks make/model/year as string)
    if (filters.keyword) {
      const k = filters.keyword.toLowerCase();
      filtered = filtered.filter(car =>
        (car.make && car.make.toLowerCase().includes(k)) ||
        (car.model && car.model.toLowerCase().includes(k)) ||
        (car.year && String(car.year).includes(k))
      );
    }

    // Budget filter
    if (filters.budget) {
      const range = getBudgetRange(filters.budget);
      if (range) {
        filtered = filtered.filter(car =>
          car.price >= range.min && car.price <= range.max
        );
      }
    }

    // Brand
    if (filters.brand) {
      filtered = filtered.filter(car =>
        car.make && car.make.toLowerCase() === filters.brand.toLowerCase()
      );
    }

    // Model
    if (filters.model) {
      filtered = filtered.filter(car =>
        car.model && car.model.toLowerCase() === filters.model.toLowerCase()
      );
    }

    // Year range
    if (filters.yearMin) {
      filtered = filtered.filter(car => car.year && car.year >= parseInt(filters.yearMin));
    }
    if (filters.yearMax) {
      filtered = filtered.filter(car => car.year && car.year <= parseInt(filters.yearMax));
    }

    setFilteredCars(filtered);
  };

  return (
    <div className="cars-page-container" style={{ display: 'flex', gap: '24px' }}>
      <SearchBar onSearch={handleSearch} />
      <CarGrid cars={filteredCars} loading={loading} />
    </div>
  );
};

export default CarsPage;