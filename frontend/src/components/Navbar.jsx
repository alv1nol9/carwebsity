import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { isLoggedIn, isAdmin } from '../utils/auth';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload(); // optional: force refresh to reset state
  };

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
        {/* Show Add Car for admin only */}
        {isAdmin() && (
          <Link to="/admin/add-car" className="nav-link">Add Car</Link>
        )}
      </div>
      <div className="navbar-right">
        {!isLoggedIn() && (
          <>
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/register" className="register-btn">Register</Link>
          </>
        )}
        {isLoggedIn() && (
          <button onClick={handleLogout} className="login-btn">Logout</button>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
