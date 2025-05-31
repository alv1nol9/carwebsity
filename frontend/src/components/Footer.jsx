import React from "react";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-line"></div>
      <div className="footer-content">
        <span>© {new Date().getFullYear()} Valley Road Motors</span>
        <span>
          Made with <span style={{color: '#e6b800'}}>♥</span> in Nairobi
        </span>
      </div>
    </footer>
  );
}
