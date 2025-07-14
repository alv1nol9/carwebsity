import React from "react";
import Footer from "./Footer";
import "../styles/About.css";
import "../styles/aboutVideo.css";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaUsers, FaCarSide, FaHandshake } from "react-icons/fa";

export default function About() {
  return (
    <div className="about-section">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="background-video"
      >
        <source src="/video(1).mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="about-card translucent-bg">
        <div className="about-title">
          About <span className="brand">Valley Road</span> <span className="gold">Motors</span>
        </div>
        <p>
          Valley Road Motors is a family-run automotive business rooted in trust, integrity, and personalized service. Proudly located on Valley Road, next to Silver Springs Hotel in Nairobi, we offer a wide selection of brand-new and pre-owned vehicles tailored to meet the needs of individual buyers, families, and businesses alike.
        </p>
        <h3><FaUsers className="about-icon gold" /> Family-Owned with Heart</h3>
        <p>
          Founded and owned by Francis Mundia Nganga and his sons Brandon Mundia Nganga and Brian Mundia Nganga, Valley Road Motors combines decades of automotive knowledge with a family touch. We believe in building long-term relationships, not just closing sales — and that’s what sets us apart.
        </p>
        <h3><FaCarSide className="about-icon navy" /> What We Offer</h3>
        <ul>
          <li><FaCarSide className="about-list-icon gold" /> Locally and internationally sourced vehicles</li>
          <li><FaHandshake className="about-list-icon navy" /> Flexible Bank and SACCO-supported financing options</li>
          <li><FaUsers className="about-list-icon gold" /> Expert consultation and dedicated customer support</li>
          <li><FaCarSide className="about-list-icon navy" /> Vehicle resale services for private individuals</li>
        </ul>
        <div className="about-highlight">
          At Valley Road Motors, you’re not just buying a car — you’re joining a family that values honesty, quality, and exceptional service. Visit us today and let’s get you on the road with confidence.
        </div>
        <div className="about-contact">
          <div><FaMapMarkerAlt className="about-contact-icon gold" /> Valley Road, next to Silver Springs Hotel, Nairobi</div>
          <div><FaEnvelope className="about-contact-icon gold" /> valleyroadmotors@gmail.com</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
