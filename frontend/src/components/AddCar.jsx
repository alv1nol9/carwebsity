import React, { useState } from 'react';
import "../styles/addcar.css"
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AddCar = () => {
  const [car, setCar] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    description: '',
    mileage: '',
    drive: '',
    engineSize: '',
    fuelType: '',
    images: [],
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1. Handle text/number inputs
  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  // 2. Handle file input
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    setPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  // 3. Upload images to backend and return Cloudinary URLs
  const uploadImages = async (files) => {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));
    const res = await fetch(`${API_URL}/api/upload/multiple`, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    return data.imageUrls; // <-- array of URLs
  };

  // 4. Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // a) Upload images first
      let imageUrls = [];
      if (selectedFiles.length > 0) {
        imageUrls = await uploadImages(selectedFiles);
      }

      // b) Prepare car object
      const token = localStorage.getItem('token');
      const carData = { ...car, images: imageUrls };

      // c) Submit car details + images to /api/cars
      const res = await fetch(`${API_URL}/api/cars`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(carData),
      });

      if (res.status === 201) {
        alert('✅ Car added successfully!');
        setCar({
          make: '', model: '', year: '', price: '', description: '',
          mileage: '', drive: '', engineSize: '', fuelType: '', images: [],
        });
        setSelectedFiles([]);
        setPreviews([]);
      } else {
        const errData = await res.json();
        alert('❌ Error: ' + (errData.message || JSON.stringify(errData)));
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
        <input type="number" name="mileage" placeholder="Mileage" value={car.mileage} onChange={handleChange} required />
        <input type="text" name="drive" placeholder="Drive (e.g. 4WD, FWD, RWD)" value={car.drive} onChange={handleChange} required />
        <input type="text" name="engineSize" placeholder="Engine Size (e.g. 1800 CC)" value={car.engineSize} onChange={handleChange} required />
        <input type="text" name="fuelType" placeholder="Fuel Type (e.g. Petrol, Diesel)" value={car.fuelType} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={car.description} onChange={handleChange} />

        <label>Car Images (You can select multiple):</label>
        <input type="file" accept="image/*" multiple onChange={handleFileChange} />

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
