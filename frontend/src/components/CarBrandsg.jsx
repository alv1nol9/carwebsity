import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css"; // make sure this path matches your folder structure

export default function CarBrandsg() {
  const navigate = useNavigate();

  // ✅ Unique brand list (duplicates removed + clean)
  const brands = [
    { name: "Bentley", logo: "https://img.logo.dev/bentleymotors.com?token=pk_bulVufMiSXiuKfAtxVtX-w&retina=true" },
    { name: "Maserati", logo: "https://img.logo.dev/maserati.com?token=pk_bulVufMiSXiuKfAtxVtX-w&retina=true" },
    { name: "Land Rover", logo: "https://img.logo.dev/landrover.com?token=pk_bulVufMiSXiuKfAtxVtX-w&retina=true" },
    { name: "Lamborghini", logo: "https://img.logo.dev/lamborghini.com?token=pk_bulVufMiSXiuKfAtxVtX-w&retina=true" },
    { name: "Porsche", logo: "https://img.logo.dev/porsche.com?token=pk_bulVufMiSXiuKfAtxVtX-w&retina=true" },
    { name: "Rolls-Royce", logo: "https://img.logo.dev/rollsroyce.com?token=pk_bulVufMiSXiuKfAtxVtX-w&retina=true" },
    { name: "Toyota", logo: "https://logo.clearbit.com/toyota.com" },
    { name: "Mazda", logo: "https://logo.clearbit.com/mazda.com" },
    { name: "Nissan", logo: "https://logo.clearbit.com/nissan-global.com" },
    { name: "Honda", logo: "https://logo.clearbit.com/honda.com" },
    { name: "BMW", logo: "https://logo.clearbit.com/bmw.com" },
    { name: "Mercedes", logo: "https://logo.clearbit.com/mercedes-benz.com" },
    { name: "Audi", logo: "https://logo.clearbit.com/audi.com" },
    { name: "Subaru", logo: "https://logo.clearbit.com/subaru.com" },
    { name: "Volkswagen", logo: "https://logo.clearbit.com/volkswagen.com" },
    { name: "Ford", logo: "https://logo.clearbit.com/ford.com" },
    { name: "Jeep", logo: "https://logo.clearbit.com/jeep.com" },
    { name: "Lexus", logo: "https://logo.clearbit.com/lexus.com" },
    { name: "Aston Martin", logo: "https://logo.clearbit.com/astonmartin.com" },
  ];

  const handleBrandClick = (brand) => {
    navigate(`/cars?brand=${encodeURIComponent(brand)}`);
  };

  // ensure even grid symmetry
  const evenBrands = brands.length % 2 === 0 ? brands : [...brands, { name: "", logo: "" }];

  return (
    <section className="brands-section">
      <h2 className="brands-heading">Shop Cars by Brand</h2>
      <p className="brands-subheading">
        Find your next car by exploring brands we stock and import.
      </p>

      <div className="brands-logo-grid">
        {evenBrands.map((b, i) =>
          b.logo ? (
            <div
              key={`${b.name}-${i}`}
              className="brand-logo-wrap"
              style={{ cursor: "pointer" }}
              onClick={() => handleBrandClick(b.name)}
            >
              <img src={b.logo} alt={b.name} className="brand-logo-img" />
              <span className="brand-logo-name">{b.name.toUpperCase()}</span>
            </div>
          ) : (
            <div
              key={`placeholder-${i}`}
              className="brand-logo-wrap"
              style={{ visibility: "hidden" }}
            ></div>
          )
        )}
      </div>

      {/* ✅ SOCIAL LINKS */}
      <div className="social-links" style={{ textAlign: "center", margin: "24px 0" }}>
        <a
          href="https://facebook.com/valleyroadmotors"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#e6b800",
            margin: "0 10px",
            fontSize: "1.5rem",
            display: "inline-block",
          }}
          aria-label="Facebook"
        >
          <i className="fab fa-facebook"></i>
        </a>
        <a
          href="https://instagram.com/valleyroadmotors"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#e6b800",
            margin: "0 10px",
            fontSize: "1.5rem",
            display: "inline-block",
          }}
          aria-label="Instagram"
        >
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </section>
  );
}
