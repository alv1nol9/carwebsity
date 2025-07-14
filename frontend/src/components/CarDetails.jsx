import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { isAdmin } from "../utils/auth";
  const [cartMsg, setCartMsg] = useState("");
  const handleAddToCart = async () => {
    setCartMsg("");
    const token = localStorage.getItem("token");
    if (!token) {
      setCartMsg("You must be logged in to add to cart.");
      return;
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ carId: car._id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add to cart");
      setCartMsg("Added to cart!");
    } catch (err) {
      setCartMsg(err.message);
    }
  };
import "../styles/cardetails.css";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedIdx, setSelectedIdx] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/cars/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCar(data);
        setLoading(false);
        setSelectedIdx(0); // Reset when changing car
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this car?')) return;
    const token = localStorage.getItem('token');
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cars/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      alert('Car deleted!');
      navigate('/cars');
    } else {
      alert('Failed to delete car');
    }
  };

  if (loading) return <div className="car-details-loading">Loading...</div>;
  if (!car || car.message === "Car not found") return <div className="car-details-loading">Car not found</div>;

  // Prepare images array fallback for old data
  const images =
    car.images && car.images.length > 0
      ? car.images
      : car.image
        ? [car.image]
        : ["/default-car.jpg"];

  // Build correct image src (support local uploads & remote links)
  const getImgSrc = (img) =>
    img.startsWith("http") ? img : `${import.meta.env.VITE_API_URL}${img}`;

  // Carousel navigation
  const prevImg = () => setSelectedIdx(idx => (idx === 0 ? images.length - 1 : idx - 1));
  const nextImg = () => setSelectedIdx(idx => (idx === images.length - 1 ? 0 : idx + 1));

  return (
    <div className="car-details-page">
      <div className="car-detail-main">
        {/* Gallery */}
        <div className="car-gallery-section">
          <div className="main-img-wrapper">
            {images.length > 1 && (
              <button className="gallery-arrow left" onClick={prevImg}>‹</button>
            )}
            <img
              src={getImgSrc(images[selectedIdx])}
              alt={`${car.make} ${car.model}`}
              className="main-img"
              onError={e => { e.target.onerror = null; e.target.src = '/default-car.jpg'; }}
            />
            {images.length > 1 && (
              <button className="gallery-arrow right" onClick={nextImg}>›</button>
            )}
          </div>
          {images.length > 1 && (
            <div className="thumb-row">
              {images.map((img, idx) => (
                <img
                  src={getImgSrc(img)}
                  key={idx}
                  alt={`thumb-${idx}`}
                  className={`thumb-img ${selectedIdx === idx ? "active" : ""}`}
                  onClick={() => setSelectedIdx(idx)}
                  onError={e => { e.target.onerror = null; e.target.src = '/default-car.jpg'; }}
                />
              ))}
            </div>
          )}
        </div>
        {/* Details */}
        <div className="car-info-section">
          <h1>{car.make} {car.model}</h1>
          <div className="car-price">
            KES {Number(car.price).toLocaleString()}
          </div>
          <div className="car-desc">{car.description}</div>
          <div className="car-specs">
            <span><b>Year:</b> {car.year}</span>
            {/* Add more specs here */}
          </div>
          <div className="cta-row">
            <a href={`https://wa.me/254700000000?text=I want to enquire about the ${car.make} ${car.model}`} className="wa-btn" target="_blank" rel="noopener noreferrer">
              💬 Enquire via WhatsApp
            </a>
            <a href="tel:0700000000" className="call-btn">
              📞 Call now
            </a>
            <button className="add-cart-btn" onClick={handleAddToCart} style={{marginLeft:8}}>
              Add to Cart
            </button>
            {isAdmin() && (
              <button className="delete-btn" onClick={handleDelete}>Delete</button>
            )}
          </div>
          {cartMsg && <div style={{color: cartMsg === "Added to cart!" ? 'green' : 'red', marginTop: 8}}>{cartMsg}</div>}
          <div className="vehicle-details-table">
          <h3>Vehicle Details</h3>
          <table>
            <tbody>
              <tr>
                <td>Year of manufacture</td>
                <td>{car.year}</td>
              </tr>
              <tr>
                <td>Mileage</td>
                <td>{car.mileage ? `${Number(car.mileage).toLocaleString()} km` : '—'}</td>
              </tr>
              <tr>
                <td>Drive</td>
                <td>{car.drive || '—'}</td>
              </tr>
              <tr>
                <td>Engine Size</td>
                <td>{car.engineSize || '—'}</td>
              </tr>
              <tr>
                <td>Fuel Type</td>
                <td>{car.fuelType || '—'}</td>
              </tr>
            </tbody>
          </table>
</div>

        </div>
      </div>
    </div>
  );
};

export default CarDetails;
