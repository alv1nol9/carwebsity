import React, { useEffect, useState } from 'react';
import '../styles/cargrid.css';
import { Link } from 'react-router-dom';

const CarGrid = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/cars`)
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching cars:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div id="featured-cars" className="car-grid-section">
      <h2>Featured Cars</h2>

      {loading ? (
        <p>Loading cars...</p>
      ) : cars.length === 0 ? (
        <p>No cars available at the moment.</p>
      ) : (
        <div className="car-grid">
          {cars.map((car) => (
            <div className="car-card" key={car._id}>
              <img src={car.image || '/placeholder.jpg'} alt={`${car.make} ${car.model}`} />
              <div className="car-info">
                <h3>{car.make} {car.model}</h3>
                <p>{car.year}</p>
                <p className="price">KES {car.price.toLocaleString()}</p>
                <Link to={`/cars/${car._id}`}>
                  <button className="view-btn">View Car</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarGrid;
