import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/cargrid.css';

function getImageUrl(img) {
  if (!img) return '/placeholder.jpg';
  if (img.startsWith('http')) return img;
  return `${import.meta.env.VITE_API_URL}${img.startsWith('/') ? '' : '/'}${img}`;
}

const CarGrid = ({ cars, loading }) => (
  <section id="featured-cars" className="car-grid-section">
    <h2 className="car-grid-title">Featured Cars</h2>
    {loading ? (
      <p className="car-grid-loading">Loading cars...</p>
    ) : cars.length === 0 ? (
      <p className="car-grid-empty">No cars available at the moment.</p>
    ) : (
      <div className="car-grid">
        {cars.map((car) => (
          <CarCardWithCart car={car} key={car._id} />
        ))}
      </div>
    )}
  </section>
);

function AddToCartButton({ car, disabled }) {
  const [msg, setMsg] = React.useState("");

  const handleAdd = async () => {
    setMsg("");
    const token = localStorage.getItem("token");
    if (!token) {
      setMsg("Login to add to cart");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ carId: car._id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add");
      setMsg("Added!");
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <button className="add-cart-btn" onClick={handleAdd} style={{ marginTop: 8 }} disabled={disabled}>
      {disabled ? "Out of Stock" : (msg || "Add to Cart")}
    </button>
  );
}

function CarCardWithCart({ car }) {
  const outOfStock = car.inStock === false;

  return (
    <div className="car-card-dark">
      <div className="car-img-wrap-dark">
        <img
          src={
            car.images?.[0]
              ? getImageUrl(car.images[0])
              : car.image
              ? getImageUrl(car.image)
              : '/placeholder.jpg'
          }
          alt={`${car.make} ${car.model}`}
          className="car-img-dark"
          onError={e => { e.target.onerror = null; e.target.src = '/placeholder.jpg'; }}
        />
        {outOfStock && (
          <span className="car-status-badge out-of-stock">OUT OF STOCK</span>
        )}
      </div>
      <div className="car-card-body-dark">
        <div className="car-info-row">
          <span className="car-year-dark">{car.year}</span>
          <span className="car-make-dark">{car.make} {car.model}</span>
        </div>
        <div className="car-labels-row">
          <span className="car-label">Automatic</span>
          <span className="car-label">2000 CC</span>
          <span className="car-label">{car.origin || "Kenyan Used"}</span>
        </div>
        <div className="car-desc">
          <span>
            {car.description?.slice(0, 120) || "No description available."}
            {car.description && car.description.length > 120 && "..."}
          </span>
        </div>
        <div className="car-price-row-dark">
          <span className="car-price-dark">
            KES {Number(car.price).toLocaleString()}
          </span>
          <span className="in-stock-badge">In-house Stock</span>
        </div>
        <Link to={`/cars/${car._id}`} className="view-btn-dark">
          View Car
        </Link>
      </div>
    </div>
  );
}

export default CarGrid;
