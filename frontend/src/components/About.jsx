import React from "react";
import Footer from "./Footer";
import "../styles/About.css";

export default function About() {
  return (
    <div className="about-section">
      <div className="about-card">
        <div className="about-title">
          About <span className="brand">Valley Road</span> <span className="gold">Motors</span>
        </div>
        <p>
          Valley Road Motors is a family-run automotive business rooted in trust, integrity, and personalized service. Proudly located on Valley Road, next to Silver Springs Hotel in Nairobi, we offer a wide selection of brand-new and pre-owned vehicles tailored to meet the needs of individual buyers, families, and businesses alike.
        </p>
        <h3>Family-Owned with Heart</h3>
        <p>
          Founded and owned by Francis Mundia Nganga and his sons Brandon Mundia Nganga and Brian Mundia Nganga, Valley Road Motors combines decades of automotive knowledge with a family touch. We believe in building long-term relationships, not just closing sales — and that’s what sets us apart.
        </p>
        <h3>What We Offer</h3>
        <ul>
          <li>Locally and internationally sourced vehicles</li>
          <li>Flexible SACCO-supported financing options</li>
          <li>Expert consultation and dedicated customer support</li>
          <li>Vehicle resale services for private individuals</li>
        </ul>
        <div className="about-highlight">
          At Valley Road Motors, you’re not just buying a car — you’re joining a family that values honesty, quality, and exceptional service. Visit us today and let’s get you on the road with confidence.
        </div>
        <div className="about-contact">
          <div>📍 Valley Road, next to Silver Springs Hotel, Nairobi</div>
          <div>📞 0700 000 000</div>
          <div>✉️ info@valleymotors.co.ke</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
