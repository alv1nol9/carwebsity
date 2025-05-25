import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/cardetails.css';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/cars/${id}`)
      .then((res) => res.json())
      .then((data) => setCar(data))
      .catch((err) => console.error('Failed to fetch car', err));
  }, [id]);

  if (!car) return <p>Loading...</p>;

  return (
    <div className="car-details">
      <img src={car.image || '/placeholder.jpg'} alt={`${car.make} ${car.model}`} />
      <div className="car-info">
        <h2>{car.make} {car.model}</h2>
        <p><strong>Year:</strong> {car.year}</p>
        <p><strong>Price:</strong> KES {car.price.toLocaleString()}</p>
        <p>{car.description}</p>
      </div>
    </div>
  );
};

export default CarDetails;