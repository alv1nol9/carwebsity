import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Make sure to create this CSS file!

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-left">
      <span className="logo">
        Valley<span className="logo-highlight">Motors</span>
      </span>
    </div>
    <div className="navbar-center">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/about" className="nav-link">About</Link>
    </div>
    <div className="navbar-right">
      <Link to="/login" className="login-btn">Login</Link>
    </div>
  </nav>
);

export default Navbar;
