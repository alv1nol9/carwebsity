import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { isAdmin } from "../utils/auth";
import "../styles/cardetails.css";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/cars/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCar(data);
        setLoading(false);
        setSelectedIdx(0);
      })
      .catch(() => setLoading(false));
  }, [id]);

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
    return img.startsWith("http") ? img : `${import.meta.env.VITE_API_URL}${img}`;
  };

  const openModal = (img) => {
    setModalImg(getImgSrc(img));
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImg("");
  };

  const prevImg = () =>
    setSelectedIdx((idx) => (idx === 0 ? images.length - 1 : idx - 1));
  const nextImg = () =>
    setSelectedIdx((idx) => (idx === images.length - 1 ? 0 : idx + 1));

  if (loading) return <div className="car-details-loading">Loading...</div>;
  if (!car || car.message === "Car not found")
    return <div className="car-details-loading">Car not found</div>;

  const images =
    car.images && car.images.length > 0
      ? car.images
      : car.image
      ? [car.image]
      : ["/default-car.jpg"];

  return (
    <div className="car-details-page">
      <div className="car-detail-main">
        {/* Gallery */}
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
                  className={`thumb-img ${selectedIdx === idx ? "active" : ""}`}
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

        {/* Details */}
        <div className="car-info-section">
          <h1>
            {car.make} {car.model}
          </h1>
          <div className="car-price">
            KES {Number(car.price).toLocaleString()}
          </div>
          <div className="car-desc">{car.description}</div>
          <div className="car-specs">
            <span>
              <b>Year:</b> {car.year}
            </span>
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
            {isAdmin() && (
              <button className="delete-btn" onClick={handleDelete}>
                Delete
              </button>
            )}
          </div>
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
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
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
};

export default CarDetails;
