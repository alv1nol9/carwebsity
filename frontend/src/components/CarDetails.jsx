import React, { useEffect, useState } from "react";
import {
  FaCogs,
  FaCarSide,
  FaGasPump,
  FaPalette,
  FaChair,
  FaShareAlt,
} from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { isAdmin } from "../utils/auth";
import "../styles/cardetails.css";

function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState("");
  const [cartMsg, setCartMsg] = useState("");
  const [loan, setLoan] = useState({ amount: 0, years: 3, rate: 12 });

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/cars/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCar(data);
        setLoading(false);
        setSelectedIdx(0);
        if (data?.price) setLoan((l) => ({ ...l, amount: data.price }));
      })
      .catch(() => setLoading(false));
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
    if (!window.confirm("Are you sure you want to delete this car?")) return;
    const token = localStorage.getItem("token");
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cars/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      alert("Car deleted!");
      navigate("/cars");
    } else {
      alert("Failed to delete car");
    }
  };

  const getImgSrc = (img) => {
    if (!img) return "/default-car.jpg";
    return img.startsWith("http")
      ? img
      : `${import.meta.env.VITE_API_URL}${img}`;
  };

  const openModal = (img) => {
    setModalImg(getImgSrc(img));
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImg("");
  };

  const images =
    car?.images?.length > 0
      ? car.images
      : car?.image
      ? [car.image]
      : ["/default-car.jpg"];

  const prevImg = () =>
    setSelectedIdx((idx) => (idx === 0 ? images.length - 1 : idx - 1));
  const nextImg = () =>
    setSelectedIdx((idx) => (idx === images.length - 1 ? 0 : idx + 1));

  if (loading) return <div className="car-details-loading">Loading...</div>;
  if (!car || car.message === "Car not found")
    return <div className="car-details-loading">Car not found</div>;

  const features = [
    car.transmission && { icon: <FaCogs />, label: car.transmission },
    car.bodyType && { icon: <FaCarSide />, label: car.bodyType },
    car.fuelType && { icon: <FaGasPump />, label: car.fuelType },
    car.color && { icon: <FaPalette />, label: car.color },
    car.seats && { icon: <FaChair />, label: `${car.seats} seats` },
  ].filter(Boolean);

  const monthly =
    loan.amount && loan.years && loan.rate
      ? (
          (loan.amount * (loan.rate / 100) / 12) +
          loan.amount / (loan.years * 12)
        ).toFixed(0)
      : 0;

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="car-details-page">
      <div className="car-detail-main">
        <div className="car-gallery-section">
          <div className="main-img-wrapper">
            {images.length > 1 && (
              <button className="gallery-arrow left" onClick={prevImg}>
                ‹
              </button>
            )}
            <img
              src={getImgSrc(images[selectedIdx])}
              alt={`${car.make} ${car.model}`}
              className="main-img"
              onClick={() => openModal(images[selectedIdx])}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-car.jpg";
              }}
            />
            {images.length > 1 && (
              <button className="gallery-arrow right" onClick={nextImg}>
                ›
              </button>
            )}
          </div>
          {images.length > 1 && (
            <div className="thumb-row">
              {images.map((img, idx) => (
                <img
                  src={getImgSrc(img)}
                  key={idx}
                  alt={`thumb-${idx}`}
                  className={`thumb-img ${
                    selectedIdx === idx ? "active" : ""
                  }`}
                  onClick={() => openModal(img)}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-car.jpg";
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="car-info-section">
          <h1>
            {car.make} {car.model}
          </h1>
          <div className="car-price">
            KES {Number(car.price).toLocaleString()}
          </div>
          <div className="car-desc">{car.description}</div>

          {features.length > 0 && (
            <div className="feature-chip-row">
              {features.map((f, i) => (
                <span key={i} className="feature-chip">
                  {f.icon} {f.label}
                </span>
              ))}
            </div>
          )}

          <div className="finance-box">
            <b>Finance Calculator</b>
            <div className="finance-inputs">
              <span>Amount:</span>
              <input
                type="number"
                min="0"
                value={loan.amount}
                onChange={(e) =>
                  setLoan((l) => ({ ...l, amount: Number(e.target.value) }))
                }
              />
              <span>Years:</span>
              <input
                type="number"
                min="1"
                max="7"
                value={loan.years}
                onChange={(e) =>
                  setLoan((l) => ({ ...l, years: Number(e.target.value) }))
                }
              />
              <span>Rate (%):</span>
              <input
                type="number"
                min="1"
                max="30"
                value={loan.rate}
                onChange={(e) =>
                  setLoan((l) => ({ ...l, rate: Number(e.target.value) }))
                }
              />
              <span>
                <b>Monthly:</b>{" "}
                <span style={{ color: "#e6b800" }}>{monthly} KES</span>
              </span>
            </div>
          </div>

          <div className="cta-row">
            <a
              href={`https://wa.me/254700000000?text=I want to enquire about the ${car.make} ${car.model}`}
              className="wa-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 Enquire via WhatsApp
            </a>
            <a href="tel:0700000000" className="call-btn">
              📞 Call now
            </a>
            <button className="add-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            {isAdmin() && (
              <button className="delete-btn" onClick={handleDelete}>
                Delete
              </button>
            )}
            <button
              className="share-btn"
              onClick={() =>
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    shareUrl
                  )}`,
                  "_blank"
                )
              }
            >
              <FaShareAlt style={{ marginRight: 6 }} />
              Share
            </button>
          </div>
          {cartMsg && (
            <div
              style={{
                color: cartMsg === "Added to cart!" ? "green" : "red",
                marginTop: 8,
              }}
            >
              {cartMsg}
            </div>
          )}

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
                  <td>
                    {car.mileage
                      ? `${Number(car.mileage).toLocaleString()} km`
                      : "—"}
                  </td>
                </tr>
                <tr>
                  <td>Drive</td>
                  <td>{car.drive || "—"}</td>
                </tr>
                <tr>
                  <td>Engine Size</td>
                  <td>{car.engineSize || "—"}</td>
                </tr>
                <tr>
                  <td>Fuel Type</td>
                  <td>{car.fuelType || "—"}</td>
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
        </div>
      </div>

      {showModal && (
        <div className="image-modal" onClick={closeModal}>
          <span className="close-btn" onClick={closeModal}>
            ×
          </span>
          <img src={modalImg} alt="Zoomed car" className="modal-img" />
        </div>
      )}
    </div>
  );
}

export default CarDetails;
