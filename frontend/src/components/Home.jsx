import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/home.css";
import CarBrandsGrid from "./CarBrandsg";

export default function Home() {
  const navigate = useNavigate();

  // Handler for Browse Cars
  const handleBrowseCars = () => {
    navigate("/cars");
  };

  // Handler for Import Quote
  const handleImportQuote = () => {
    navigate("/contact");
  };

  return (
    <>
      {/* HERO SECTION */}
      <div className="main-hero">
        {/* --- VIDEO BACKGROUND --- */}
        <video
          className="hero-bg-video"
          src="/video.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* --- DARK OVERLAY --- */}
        <div className="hero-overlay"></div>

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
      </div>

      {/* EVERYTHING ELSE GOES OUTSIDE .main-hero */}
      <CarBrandsGrid />
      <Footer />
    </>
  );
}
