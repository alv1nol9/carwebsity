import React from 'react';
import '../styles/searchbar.css';


const handleSearch = () => {
  console.log({
    keyword,
    make,
    model,
    year,
    price,
  });
};



const SearchBar = () => {
  return (
    <div className="search-bar">
      <h2>Search Your Next Car</h2>
      <form className="search-form">
        <input type="text" placeholder="Search by keyword..." />

        <select>
          <option>Make</option>
          <option>Toyota</option>
          <option>Mazda</option>
          <option>Nissan</option>
          <option>BMW</option>
        </select>

        <select>
          <option>Model</option>
          <option>Corolla</option>
          <option>Axela</option>
          <option>Note</option>
          <option>X5</option>
        </select>

        <select>
          <option>Year</option>
          <option>2024</option>
          <option>2023</option>
          <option>2022</option>
          <option>2020</option>
        </select>
        <select>
          <option>Price</option>
          <option>Below KES 1M</option>
          <option>KES 1M - 2M</option>
          <option>KES 2M - 3M</option>
          <option>Above KES 3M</option>
        </select>
        <button onClick={handleSearch}>Search</button>
        <button type="button" className="btn-quote">Import Quote</button>
        
      </form>
    </div>
  );
};
export default SearchBar;
