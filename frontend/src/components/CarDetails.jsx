import React from 'react';
import '../styles/cardetails.css';

const CarDetails = ({ car }) => {
  // If you fetch from backend, you might use useEffect and useParams for the car ID
  // For now, let's assume `car` is passed as a prop or fetched in a parent

  if (!car) {
    return <div className="car-details-loading">Loading...</div>;
  }

  return (
    <div className="car-details-page">
      <div className="car-details-container">
        {/* Left: Image and Thumbnails */}
        <div className="car-details-images">
          <img src={car.image || '/default-car.jpg'} alt={car.make + ' ' + car.model} className="main-car-image" />
          <div className="car-thumbnails">
            {/* Loop over car.images if you have multiple */}
            {(car.images || [car.image]).map((img, idx) => (
              <img key={idx} src={img} alt={car.make + ' ' + car.model + idx} className="thumbnail" />
            ))}
          </div>
        </div>

        {/* Right: Info and Actions */}
        <div className="car-details-info">
          <h1>{car.make} {car.model}</h1>
          <div className="car-desc">{car.description}</div>
          <div className="car-specs">
            <div><span>Year:</span> {car.year}</div>
            <div><span>Transmission:</span> {car.transmission || "Automatic"}</div>
            <div><span>Engine:</span> {car.engine || "2500 CC"}</div>
            <div><span>Condition:</span> {car.condition || "Kenyan Used"}</div>
            <div><span>Price:</span> <span className="car-price">KES {Number(car.price).toLocaleString()}</span></div>
          </div>
          <div className="car-actions">
            <a href={`https://wa.me/254700000000?text=I want to enquire about the ${car.make} ${car.model}`} className="whatsapp-btn" target="_blank" rel="noopener noreferrer">
              <span role="img" aria-label="WhatsApp">💬</span> Enquire via WhatsApp
            </a>
            <a href="tel:0700000000" className="call-btn">
              <span role="img" aria-label="Call">📞</span> Call now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
