import React, { useState } from 'react';
import '../styles/addcar.css';

const AddCar = () => {
  const [car, setCar] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    image: '',
    description: '',
  });

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const res = await fetch('http://localhost:5000/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(car),
      });

      if (res.status === 201) {
        alert('✅ Car added successfully!');
        setCar({ make: '', model: '', year: '', price: '', image: '', description: '' });
      } else {
        const errData = await res.json();
        alert('❌ Error: ' + errData.message);
      }
    } catch (err) {
      console.error('Error adding car:', err);
    }
  };

  return (
    <div className="add-car-form">
      <h2>Add New Car (Admin Only)</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="make" placeholder="Make" value={car.make} onChange={handleChange} required />
        <input type="text" name="model" placeholder="Model" value={car.model} onChange={handleChange} required />
        <input type="number" name="year" placeholder="Year" value={car.year} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price (KES)" value={car.price} onChange={handleChange} required />
        <input type="text" name="image" placeholder="Image URL" value={car.image} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={car.description} onChange={handleChange} />
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
};

export default AddCar;
