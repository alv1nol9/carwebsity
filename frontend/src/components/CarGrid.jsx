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
    <section id="featured-cars" className="car-grid-section">
      <h2 className="car-grid-title">Featured Cars</h2>

      {loading ? (
        <p className="car-grid-loading">Loading cars...</p>
      ) : cars.length === 0 ? (
        <p className="car-grid-empty">No cars available at the moment.</p>
      ) : (
        <div className="car-grid">
          {cars.map((car) => (
            <div className="car-card" key={car._id}>
              <div className="car-img-wrap">
                <img
                  src={
                    car.image
                      ? (car.image.startsWith('http')
                          ? car.image
                          : `${import.meta.env.VITE_API_URL}${car.image}`)
                      : '/placeholder.jpg'
                  }
                  alt={`${car.make} ${car.model}`}
                  className="car-img"
                  onError={e => { e.target.onerror = null; e.target.src = '/placeholder.jpg'; }}
                />
                {car.status === "Available" && (
                  <span className="car-badge">Available</span>
                )}
              </div>
              <div className="car-card-body">
                <div className="car-title-row">
                  <span className="car-title">
                    {car.year && <span className="car-year">{car.year}</span>} {car.make} {car.model}
                  </span>
                </div>
                <div className="car-price-row">
                  <span className="car-price">
                    KES {Number(car.price).toLocaleString()}
                  </span>
                </div>
                <Link to={`/cars/${car._id}`} className="view-btn">
                  View Car
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CarGrid;
