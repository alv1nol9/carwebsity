import React from 'react';
import '../styles/topbar.css';

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="contact-info">
        <span>📞 0709-888-777</span>
        <span>✉️ info@valleymotors.co.ke</span>
      </div>
      <div className="social-icons">
        <span>WhatsApp</span>
        <span>Facebook</span>
        <span>Instagram</span>
        <span>Twitter</span>
      </div>
    </div>
  );
};

export default TopBar;
