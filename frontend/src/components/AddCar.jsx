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
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    let imageUrl = car.image;

    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);

      try {
        const res = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });
        const data = await res.json();
        imageUrl = data.imageUrl;
      } catch (err) {
        alert('❌ Image upload failed: ' + err.message);
        return;
      }
    }

    try {
      const res = await fetch('http://localhost:5000/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ ...car, image: imageUrl }),
      });

      if (res.status === 201) {
        alert('✅ Car added successfully!');
        setCar({ make: '', model: '', year: '', price: '', image: '', description: '' });
        setSelectedFile(null);
      } else {
        const errData = await res.json();
        alert('❌ Error: ' + (errData.message || JSON.stringify(errData) || "Unknown error"));
      }
    } catch (err) {
      alert('❌ Error: ' + err.message);
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
        <input type="text" name="image" placeholder="Image URL (optional)" value={car.image} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={car.description} onChange={handleChange} />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
};

export default AddCar;
