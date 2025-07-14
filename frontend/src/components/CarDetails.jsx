

import React, { useEffect, useState } from "react";
import { FaCogs, FaCarSide, FaGasPump, FaPalette, FaChair, FaShareAlt } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { isAdmin } from "../utils/auth";

function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [cartMsg, setCartMsg] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/cars/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCar(data);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!cart.includes(id)) {
      cart.push(id);
      localStorage.setItem("cart", JSON.stringify(cart));
      setCartMsg("Added to cart!");
    } else {
      setCartMsg("Already in cart");
    }
    setTimeout(() => setCartMsg(""), 2000);
  };

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

  // --- Feature badges (example, can be expanded) ---
  const features = [
    car.transmission && { icon: <FaCogs />, label: car.transmission },
    car.bodyType && { icon: <FaCarSide />, label: car.bodyType },
    car.fuelType && { icon: <FaGasPump />, label: car.fuelType },
    car.color && { icon: <FaPalette />, label: car.color },
    car.seats && { icon: <FaChair />, label: `${car.seats} seats` },
  ].filter(Boolean);

  // --- Simple finance calculator ---
  const [loan, setLoan] = useState({ amount: car?.price || 0, years: 3, rate: 12 });
  const monthly = loan.amount && loan.years && loan.rate
    ? ((loan.amount * (loan.rate/100) / 12) + (loan.amount / (loan.years*12))).toFixed(0)
    : 0;

  // --- Social share ---
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Check out this ${car.make} ${car.model} on CarWebsity!`;

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
          {/* Feature badges */}
          {features.length > 0 && (
            <div style={{display:'flex', gap:12, margin:'12px 0'}}>
              {features.map((f, i) => (
                <span key={i} style={{display:'flex',alignItems:'center',background:'#f7f8fa',borderRadius:8,padding:'6px 12px',fontSize:15,gap:6,color:'#4527a0',fontWeight:600}}>
                  {f.icon} {f.label}
                </span>
              ))}
            </div>
          )}
          <div className="car-specs">
            <span><b>Year:</b> {car.year}</span>
            {car.transmission && <span style={{marginLeft:16}}><b>Transmission:</b> {car.transmission}</span>}
            {car.bodyType && <span style={{marginLeft:16}}><b>Body:</b> {car.bodyType}</span>}
            {car.color && <span style={{marginLeft:16}}><b>Color:</b> {car.color}</span>}
            {car.seats && <span style={{marginLeft:16}}><b>Seats:</b> {car.seats}</span>}
          </div>
          {/* Finance calculator */}
          <div style={{margin:'18px 0',padding:'16px',background:'#f7f8fa',borderRadius:10}}>
            <b>Finance Calculator</b>
            <div style={{display:'flex',gap:12,alignItems:'center',marginTop:8}}>
              <span>Amount:</span>
              <input type="number" min="0" value={loan.amount} onChange={e=>setLoan(l=>({...l,amount:Number(e.target.value)}))} style={{width:100}} />
              <span>Years:</span>
              <input type="number" min="1" max="7" value={loan.years} onChange={e=>setLoan(l=>({...l,years:Number(e.target.value)}))} style={{width:50}} />
              <span>Rate (%):</span>
              <input type="number" min="1" max="30" value={loan.rate} onChange={e=>setLoan(l=>({...l,rate:Number(e.target.value)}))} style={{width:50}} />
              <span style={{marginLeft:12}}><b>Monthly:</b> <span style={{color:'#e6b800'}}>{monthly} KES</span></span>
            </div>
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
            {/* Social share */}
            <button className="add-cart-btn" style={{marginLeft:8,background:'#1877F3',color:'#fff'}} onClick={()=>window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,'_blank')} title="Share on Facebook"><FaShareAlt style={{marginRight:6}}/>Share</button>
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
                {car.registration && (
                  <tr>
                    <td>Registration</td>
                    <td>{car.registration}</td>
                  </tr>
                )}
                {car.insurance && (
                  <tr>
                    <td>Insurance</td>
                    <td>{car.insurance}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Social Media Section */}
          <div className="car-social-section" style={{marginTop: 40, textAlign: 'center'}}>
            <h3 style={{color: '#e6b800', marginBottom: 12}}>Connect with Us</h3>
            <div style={{display: 'flex', justifyContent: 'center', gap: 24, fontSize: 32}}>
              <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer" title="WhatsApp" style={{color: '#25D366'}}>
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href="https://instagram.com/yourhandle" target="_blank" rel="noopener noreferrer" title="Instagram" style={{color: '#E1306C'}}>
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://facebook.com/yourhandle" target="_blank" rel="noopener noreferrer" title="Facebook" style={{color: '#1877F3'}}>
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://x.com/yourhandle" target="_blank" rel="noopener noreferrer" title="X (Twitter)" style={{color: '#000'}}>
                <i className="fab fa-x-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarDetails;
