import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="logo">
        <NavLink to="/">Valley<span>Motors</span></NavLink>
      </div>

      <ul className="nav-links">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink>
        </li>
      </ul>
      <div className="nav-actions">
        <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>
          <button className="btn-login">Login</button>
        </NavLink>
        <NavLink to="/admin/add-car" className={({ isActive }) => isActive ? 'active' : ''}>
          <button className="btn-sell">Add Car</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
