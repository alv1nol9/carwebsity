import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/cargrid.css'

function getImageUrl(img) {
  if (!img) return '/placeholder.jpg';
  if (img.startsWith('http')) return img;
  // Always ensure there's a slash between the base URL and the path
  return `${import.meta.env.VITE_API_URL}${img.startsWith('/') ? '' : '/'}${img}`;
}

const CarGrid = ({ cars, loading }) => (
  <section id="featured-cars" className="car-grid-section">
    <h2 className="car-grid-title">Featured Cars</h2>
    {loading ? (
      <p className="car-grid-loading">Loading cars...</p>
    ) : cars.length === 0 ? (
      <p className="car-grid-empty">No cars available at the moment.</p>
    ) : (
      <div className="car-grid">
        {cars.map((car) => (
        <div className="car-card-dark" key={car._id}>
          <div className="car-img-wrap-dark">
         <img
              src={
                car.images && car.images.length > 0
                  ? getImageUrl(car.images[0])
                  : car.image
                    ? getImageUrl(car.image)
                    : '/placeholder.jpg'
              }
              alt={`${car.make} ${car.model}`}
              className="car-img-dark"
              onError={e => { e.target.onerror = null; e.target.src = '/placeholder.jpg'; }}
            />


            {car.status === "Available" && (
              <span className="car-status-badge">AVAILABLE</span>
            )}
          </div>
          <div className="car-card-body-dark">
            <div className="car-info-row">
              <span className="car-year-dark">{car.year}</span>
              <span className="car-make-dark">{car.make} {car.model}</span>
            </div>
            <div className="car-labels-row">
              <span className="car-label">Automatic</span>
              <span className="car-label">2000 CC</span>
              <span className="car-label">{car.origin || "Kenyan Used"}</span>
            </div>
            <div className="car-desc">
              <span>
                {car.description?.slice(0, 120) || "No description available."}{car.description && car.description.length > 120 && "..."}
              </span>
            </div>
            <div className="car-price-row-dark">
              <span className="car-price-dark">
                KES {Number(car.price).toLocaleString()}
              </span>
              <span className="in-stock-badge">In-house Stock</span>
            </div>
            <Link to={`/cars/${car._id}`} className="view-btn-dark">
              View Car
            </Link>
          </div>
        </div>

        ))}
      </div>
    )}
  </section>
);

export default CarGrid;
