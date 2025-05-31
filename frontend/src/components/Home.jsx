import React from "react";
import { useNavigate } from "react-router-dom"; // 1. Import this!
import Footer from "../components/Footer";
import "../styles/home.css"; 

export default function Home() {
  const navigate = useNavigate(); // 2. Set up navigation

  // Handler for Browse Cars
  const handleBrowseCars = () => {
    navigate("/cars"); // go to the Cars/Featured Cars page
  };

  // Handler for Import Quote
  const handleImportQuote = () => {
    navigate("/contact"); // go to the Contact page
  };

  return (
    <div className="main-hero">
      <div className="hero-center-content">
        <h1>
          Find Your Perfect Ride <span className="highlight-bold"></span>
        </h1>
        <div className="hero-btn-row">
          <button className="hero-btn main-btn" onClick={handleBrowseCars}>
            Browse Cars
          </button>
          <button className="hero-btn light-btn" onClick={handleImportQuote}>
            Get import quote
          </button>
        </div>
        <div className="scroll-indicator">
          <span></span>
          <br />
        </div>
      </div>
      <Footer />
    </div>
  );
}
