import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import CarBrandsGrid from "./CarBrandsg";

export default function Home() {
  const navigate = useNavigate();

  const handleBrowseCars = () => {
    navigate("/cars");
  };
  const handleImportQuote = () => {
    navigate("/contact");
  };
  const handleTestDrive = () => {
    navigate("/test-drive"); // Change route as needed!
  };

  return (
    <>
      {/* FULLSCREEN VIDEO HERO SECTION */}
      <div className="main-hero">
        <video
          className="hero-bg-video"
          src="/video(2).mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{ objectFit: 'cover', width: '100vw', height: '100vh', position: 'absolute', left: 0, top: 0, zIndex: 0 }}
        />
        <div className="hero-overlay" style={{ background: 'rgba(0,0,0,0.55)', position: 'absolute', width: '100vw', height: '100vh', top: 0, left: 0, zIndex: 1 }}></div>
        <div className="hero-center-content" style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: '#fff', paddingTop: '12vh' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 700, letterSpacing: '2px', marginBottom: '18px', textShadow: '0 2px 16px #000' }}>Find Your Perfect Ride</h1>
          <div className="hero-btn-row" style={{ display: 'flex', justifyContent: 'center', gap: '18px', marginBottom: '18px' }}>
            <button className="hero-btn main-btn" onClick={handleBrowseCars} style={{ fontSize: '1.2rem', padding: '12px 32px', borderRadius: '8px', background: '#e6b800', color: '#111', fontWeight: 600 }}>Browse Cars</button>
            <button className="hero-btn light-btn" onClick={handleImportQuote} style={{ fontSize: '1.2rem', padding: '12px 32px', borderRadius: '8px', background: '#fff', color: '#222', fontWeight: 600 }}>Get Import Quote</button>
            <button className="hero-btn book-btn" onClick={handleTestDrive} style={{ fontSize: '1.2rem', padding: '12px 32px', borderRadius: '8px', background: '#222', color: '#e6b800', fontWeight: 600, border: '2px solid #e6b800' }}>Book Test Drive</button>
          </div>
        </div>
      </div>

      {/* CAR BRANDS SECTION BELOW HERO */}
      <CarBrandsGrid />

      {/* SOCIAL MEDIA LINKS */}
      <div className="social-links" style={{textAlign: 'center', margin: '32px 0', display: 'flex', justifyContent: 'center', gap: '32px'}}>
        <a href="https://facebook.com/valleyroadmotors" target="_blank" rel="noopener noreferrer" style={{color:'#e6b800', fontSize:'2.5rem'}} title="Facebook">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="https://instagram.com/valleyroadmotors" target="_blank" rel="noopener noreferrer" style={{color:'#e6b800', fontSize:'2.5rem'}} title="Instagram">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://twitter.com/valleyroadmotors" target="_blank" rel="noopener noreferrer" style={{color:'#e6b800', fontSize:'2.5rem'}} title="Twitter">
          <i className="fab fa-twitter"></i>
        </a>
      </div>
      <Footer />
    </>
  );
}
