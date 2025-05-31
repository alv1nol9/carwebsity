
import React, { useState } from 'react';
import '../styles/searchbar.css';

const budgetRanges = [
  { label: '0 - 500K', value: '0-500K' },
  { label: '500K - 1M', value: '500K-1M' },
  { label: '1M - 2M', value: '1M-2M' },
  { label: '2M - 3M', value: '2M-3M' },
  { label: '3M - 5M', value: '3M-5M' },
  { label: '5M - 10M', value: '5M-10M' },
  { label: 'Above 10M', value: '10M+' },
];

const brands = ['Toyota', 'Mazda', 'Nissan', 'BMW', 'Subaru'];
const models = {
  Toyota: ['Mark X', 'Corolla', 'Vitz'],
  Mazda: ['Axela', 'Demio'],
  Nissan: ['Note', 'X-Trail'],
  BMW: ['X5', '3 Series'],
  Subaru: ['Forester', 'Impreza'],
};

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');
  const [budget, setBudget] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [yearMin, setYearMin] = useState('');
  const [yearMax, setYearMax] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleBudgetClick = (value) => {
    setBudget(value);
    if (onSearch) onSearch({ budget: value }); // Optionally call parent
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({
        keyword,
        budget,
        brand,
        model,
        yearMin,
        yearMax,
      });
    } else {
      console.log({ keyword, budget, brand, model, yearMin, yearMax });
    }
  };

  return (
    <aside className="car-search-sidebar">
      <form onSubmit={handleSearch}>
        {/* Keyword Search */}
        <div className="search-section">
          <label>Search vehicle</label>
          <input
            type="text"
            placeholder="Search vehicle name"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
          />
        </div>

        {/* Budget Filter */}
        <div className="search-section">
          <label>Filter by budget</label>
          <div className="budget-buttons">
            {budgetRanges.map(({ label, value }) => (
              <button
                type="button"
                key={value}
                className={budget === value ? 'selected' : ''}
                onClick={() => handleBudgetClick(value)}
              >
                {label}
              </button>
            ))}
          </div>
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

        {/* Advanced Search Fields */}
        {showAdvanced && (
          <>
            {/* Brand & Model */}
            <div className="search-section">
              <label>Brand & Model</label>
              <select value={brand} onChange={e => {
                setBrand(e.target.value);
                setModel('');
              }}>
                <option value="">Vehicle Brand</option>
                {brands.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              <select value={model} onChange={e => setModel(e.target.value)} disabled={!brand}>
                <option value="">Brand Model</option>
                {brand && models[brand].map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            {/* Year Range */}
            <div className="search-section year-range">
              <label>Year of Manufacture</label>
              <input
                type="number"
                placeholder="Min YOM"
                min="1990"
                max={yearMax || 2024}
                value={yearMin}
                onChange={e => setYearMin(e.target.value)}
              />
              <input
                type="number"
                placeholder="Max YOM"
                min={yearMin || 1990}
                max="2024"
                value={yearMax}
                onChange={e => setYearMax(e.target.value)}
              />
            </div>
            {/* Price (You can add more currency logic if needed) */}
            {/* <div className="search-section">
              <label>Price & Currency</label>
              <input type="number" placeholder="Min Price" />
              <input type="number" placeholder="Max Price" />
              <select>
                <option>KES</option>
                <option>USD</option>
              </select>
            </div> */}
          </>
        )}

        <button type="submit" className="search-btn">Search</button>
      </form>
    </aside>
  );
};

export default SearchBar;
