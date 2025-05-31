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
    <div className="hero-container">
      {/* Replace the src with your actual car image */}
      <img
        src="/prado.png"
        alt="Hero car"
        className="hero-bg-car"
      />
      <div className="hero-content">
        <div className="hero-title">Find Your Perfect Ride</div>
        <div className="hero-sub">
          Discover top-quality cars at unbeatable prices
        </div>
        <div className="hero-btn-row">
          <button className="hero-btn-yellow" onClick={handleScroll}>
            Browse Cars
          </button>
          <button className="hero-btn-outline">
            Get Import Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
