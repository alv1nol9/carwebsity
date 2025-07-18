import React from "react";
import '../styles/footer.css'
import {
  FaFacebookF,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";


const Footer = ()=>{
  return (
    <footer className="footer-main">
      <div className="footer-top">
        <div className="footer-col">
          <h4>CARS</h4>
          <ul>
            <li>ALL STOCK</li>
            <li>IN STOCK</li>
            <li>SHIPPING</li>
            <li>NEW ARRIVALS</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>TRADE IN</h4>
          <ul>
            <li>FINANCING</li>
            <li>BLOG</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>TOP BRANDS</h4>
          <ul className="footer-brands">
            <li>TOYOTA</li>
            <li>NISSAN</li>
            <li>VOLKSWAGEN</li>
            <li>MERCEDES</li>
            <li>PEUGEOT</li>
            <li>AUDI</li>
            <li>ISUZU</li>
            <li>LAND ROVER</li>
            <li>HONDA</li>
            <li>MITSUBISHI</li>
            <li>MAZDA</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>ABOUT US</h4>
          <ul>
            <li><b>CONTACT US</b></li>
            <li>
              <FaClock className="footer-icon" /> Office Hours : 8 am - 5 pm Daily
            </li>
            <li>
              <FaPhoneAlt className="footer-icon" />Nancy-+254 721 860497       <br />    Mary- +254 792 252870     <br />  Brandon- +254 794 372046
            </li>
            <li>
              <FaEnvelope className="footer-icon" />valleyroadmotors@gmail.com
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-socials">
          <a href="https://www.facebook.com/valleyroadmotorsltd" aria-label="Facebook"><FaFacebookF /></a>
          <a href="https://www.instagram.com/valleyroadmotors/" aria-label="Instagram"><FaInstagram /></a>
          
        </div>
        <div className="footer-copyright">
          Copyright &copy; 2025 VALLEY ROAD MOTORS. All Rights Reserved. | Privacy Policy &amp; Terms Of Use
        </div>
      </div>
    </footer>
  );
}

export default Footer;