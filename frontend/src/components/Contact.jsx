import React from "react";
import Footer from "../components/Footer";
import "../styles/Contact.css";

export default function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-content-wrapper">
        {/* Info Card */}
        <div className="contact-info-card">
          <h2 className="contact-title">Contact Us</h2>
          <div className="contact-details">
            <div className="contact-details-col">
              <div>
                <b>Visit us:</b><br />
                Valley Road, next to Silver Springs Hotel<br />
                Nairobi, Kenya
              </div>
              <div style={{ marginTop: "24px" }}>
                <b>Hours:</b><br />
                Mon–Sat: 8am – 6pm<br />
                Sunday: Closed
              </div>
            </div>
            <div className="contact-details-col">
              <div>
                <b>Call:</b><br />
                <a href="tel:0721860497">Nancy – +254 721 860497</a><br />
                <a href="tel:0792252870">Mary – +254 792 252870</a><br />
                <a href="tel:0794372046">Brandon – +254 794 372046</a>
              </div>
              <div style={{ marginTop: "24px" }}>
                <b>Email:</b><br />
                <a className="contact-email" href="mailto:valleyroadmotors@gmail.com">
                  valleyroadmotors@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Map */}
        <div className="contact-map-large">
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4378.332236236477!2d36.80029221093729!3d-1.2939599356299174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f11bed45c2931%3A0xc35de7dec40191e2!2sValley%20Road%20Motors!5e1!3m2!1sen!2ske!4v1748876629002!5m2!1sen!2ske"
            title="Valley Road Motors Map"
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: "18px", minHeight: "320px" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
      <Footer />
    </div>
  );
}
