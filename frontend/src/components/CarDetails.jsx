import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { isAdmin } from "../utils/auth";
import "../styles/cardetails.css";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/cars/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCar(data);
        setLoading(false);
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

  return (
    <div className="car-details-page">
      <div className="car-details-container">
        {/* Car details layout */}
        <div className="car-details-images">
          <img src={car.image || '/default-car.jpg'} alt={car.make + ' ' + car.model} className="main-car-image" />
        </div>
        <div className="car-details-info">
          <h1>{car.make} {car.model}</h1>
          <div>{car.description}</div>
          <div>Year: {car.year}</div>
          <div>Price: {car.price}</div>
          {/* More car info ... */}
        <div className="car-actions">
            <a href={`https://wa.me/254700000000?text=I want to enquire about the ${car.make} ${car.model}`} className="whatsapp-btn" target="_blank" rel="noopener noreferrer">
              <span role="img" aria-label="WhatsApp">💬</span> Enquire via WhatsApp
            </a>
            <a href="tel:0700000000" className="call-btn">
              <span role="img" aria-label="Call">📞</span> Call now
            </a>
            {isAdmin() && (
              <button className="delete-btn" onClick={handleDelete}>Delete</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
