import React, { useState } from 'react';
import '../styles/addcar.css';

const API_URL = 'http://localhost:5000'; // or use import.meta.env.VITE_API_URL

const AddCar = () => {
// Add to the initial state:
const [car, setCar] = useState({
  make: '',
  model: '',
  year: '',
  price: '',
  description: '',
  mileage: '',     // NEW
  drive: '',       // NEW (e.g. "4WD", "FWD", "RWD")
  engineSize: '',  // NEW (e.g. "1800 CC")
  fuelType: '',    // NEW (e.g. "Petrol", "Diesel")
});

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    // Create preview URLs
    const filePreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(filePreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');
    let imageUrls = [];

    // 1. Upload images first
    if (selectedFiles.length > 0) {
      const formData = new FormData();
      selectedFiles.forEach(file => formData.append('images', file)); // 'images' matches backend field

      try {
        const res = await fetch(`${API_URL}/api/upload/multiple`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData,
        });
        const data = await res.json();
        imageUrls = data.images; // array of URLs/paths
      } catch (err) {
        alert('❌ Image upload failed: ' + err.message);
        setLoading(false);
        return;
      }
    }

    // 2. Submit the car with the image array
    try {
      const res = await fetch(`${API_URL}/api/cars`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ ...car, images: imageUrls }),
      });

      if (res.status === 201) {
        alert('✅ Car added successfully!');
        setCar({ make: '', model: '', year: '', price: '', description: '' });
        setSelectedFiles([]);
        setPreviews([]);
      } else {
        const errData = await res.json();
        alert('❌ Error: ' + (errData.message || JSON.stringify(errData) || "Unknown error"));
      }
    } catch (err) {
      alert('❌ Error: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="add-car-form">
      <h2>Add New Car (Admin Only)</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="make" placeholder="Make" value={car.make} onChange={handleChange} required />
        <input type="text" name="model" placeholder="Model" value={car.model} onChange={handleChange} required />
        <input type="number" name="year" placeholder="Year" value={car.year} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price (KES)" value={car.price} onChange={handleChange} required />
        <input type="number"name="mileage" placeholder="Mileage (e.g. 122000)" value={car.mileage} onChange={handleChange}require/>
        <input type="text" name="drive" placeholder="Drive (e.g. 4WD, FWD, RWD)"value={car.drive} onChange={handleChange} require/>
        <input type="text"name="engineSize" placeholder="Engine Size (e.g. 1800 CC)" value={car.engineSize} onChange={handleChange}required/>
        <input type="text" name="fuelType" placeholder="Fuel Type (e.g. Petrol, Diesel)" value={car.fuelType}onChange={handleChange}required/>
        <textarea name="description" placeholder="Description" value={car.description} onChange={handleChange} />

        <label style={{ marginTop: '12px', marginBottom: '6px', fontWeight: 'bold' }}>
          Car Images (You can select multiple):
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />

        {/* Preview thumbnails */}
        {previews.length > 0 && (
          <div style={{ display: 'flex', gap: 10, margin: '12px 0', flexWrap: 'wrap' }}>
            {previews.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`preview-${idx}`}
                style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 6, border: '2px solid #eee' }}
              />
            ))}
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Add Car'}
        </button>
      </form>
    </div>
  );
};

export default AddCar;
