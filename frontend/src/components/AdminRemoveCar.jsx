import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminRemoveCar() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/cars`)
      .then(res => res.json())
      .then(data => {
        setCars(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load cars.");
        setLoading(false);
      });
  }, []);

  const handleRemove = async (id) => {
    if (!window.confirm("Are you sure you want to remove this car?")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cars/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete car");
      setCars(cars.filter(car => car._id !== id));
    } catch (err) {
      alert("Error deleting car.");
    }
  };

  if (loading) return <div>Loading cars...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="admin-remove-car-page">
      <h2>Remove Cars</h2>
      <ul className="admin-car-list">
        {cars.map(car => (
          <li key={car._id} className="admin-car-item">
            <span>{car.make} {car.model} ({car.year})</span>
            <button onClick={() => handleRemove(car._id)} className="remove-btn">Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/")} className="back-btn">Back to Home</button>
    </div>
  );
}
