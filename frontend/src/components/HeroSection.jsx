import React from 'react';
import '../styles/hero.css';

const HeroSection = () => {
  const handleScroll = () => {
    const section = document.getElementById("featured-cars");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hero-section">
      <div className="hero-overlay">
        <h1>Find Your Perfect Ride</h1>
        <p>Discover top-quality cars at unbeatable prices</p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={handleScroll}>Browse Cars</button>
          <button className="btn-outline">Get Import Quote</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
