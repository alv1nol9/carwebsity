import React from "react";
import Footer from "../components/Footer";
import "../styles/Contact.css";

export default function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-info-card">
        <h2 className="contact-title">Contact Us</h2>
        <div className="contact-details">
          <p>
            <b>Visit us:</b><br />
            Valley Road, next to Silver Springs Hotel<br />
            Nairobi, Kenya
          </p>
          <p>
            <b>Call:</b> <a href="tel:0700000000">0700 000 000</a><br />
            <b>Email:</b> <a href="mailto:info@valleymotors.co.ke">info@valleymotors.co.ke</a>
          </p>
          <p>
            <b>Hours:</b><br />
            Mon–Sat: 8am – 6pm<br />
            Sunday: Closed
          </p>
        </div>
      </div>
      <div className="contact-map-large">
        <iframe
          src="https://maps.google.com/maps?q=silver%20springs%20hotel%20valley%20road%20nairobi&t=&z=15&ie=UTF8&iwloc=&output=embed"
          title="Valley Road Motors Map"
          width="100%"
          height="400"
          style={{ border: 0, borderRadius: "12px", minHeight: "300px" }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
      <Footer />
    </div>
  );
}
