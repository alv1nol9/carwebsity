import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar-main">
      <div className="navbar-left">
        <span className="logo">
          Valley Road<span className="logo-highlight">Motors</span>
        </span>
      </div>
      <div className="navbar-center">
        <Link to="/" className={`nav-link${location.pathname === '/' ? ' active' : ''}`}>Home</Link>
        <Link to="/cars" className={`nav-link${location.pathname === '/cars' ? ' active' : ''}`}>Cars</Link>
        <Link to="/about" className={`nav-link${location.pathname === '/about' ? ' active' : ''}`}>About</Link>
        <Link to="/contact" className={`nav-link${location.pathname === '/contact' ? ' active' : ''}`}>Contact</Link>
      </div>
      <div className="navbar-right">
        <Link to="/login" className="login-btn">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
