import React, { useEffect, useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to view your cart.");
      setLoading(false);
      return;
    }
    fetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setCart(data.cart || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load cart.");
        setLoading(false);
      });
  }, []);

  const removeFromCart = async (carId) => {
    const token = localStorage.getItem("token");
    setError("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/remove`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ carId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to remove car");
      setCart(data.cart || []);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading cart...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((car) => (
            <li key={car._id}>
              {car.make} {car.model} ({car.year}) - KES {Number(car.price).toLocaleString()}
              <button onClick={() => removeFromCart(car._id)} style={{ marginLeft: 8 }}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
