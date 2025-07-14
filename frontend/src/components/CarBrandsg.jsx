import React from "react";
import "../styles/home.css"

const brands = [
  { name: "Toyota", logo: "https://logo.clearbit.com/toyota.com" },
  { name: "Mazda", logo: "https://logo.clearbit.com/mazda.com" },
  { name: "Nissan", logo: "https://logo.clearbit.com/nissan-global.com" },
  { name: "Honda", logo: "https://logo.clearbit.com/honda.com" },
  { name: "BMW", logo: "https://logo.clearbit.com/bmw.com" },
  { name: "Mercedes", logo: "https://logo.clearbit.com/mercedes-benz.com" },
  { name: "Audi", logo: "https://logo.clearbit.com/audi.com" },
  { name: "Subaru", logo: "https://logo.clearbit.com/subaru.com" },
  { name: "Volkswagen", logo: "https://logo.clearbit.com/volkswagen.com" },
  { name: "Ford", logo: "https://logo.clearbit.com/ford.com" },
  { name: "Jeep", logo: "https://logo.clearbit.com/jeep.com" },
  { name: "Lexus", logo: "https://logo.clearbit.com/lexus.com" },
  // Luxury brands
  { name: "Lamborghini", logo: "https://logo.clearbit.com/lamborghini.com" },
  { name: "Aston Martin", logo: "https://logo.clearbit.com/astonmartin.com" },
  { name: "Ferrari", logo: "https://logo.clearbit.com/ferrari.com" },
  { name: "Porsche", logo: "https://logo.clearbit.com/porsche.com" },
  { name: "Bentley", logo: "https://logo.clearbit.com/bentleymotors.com" },
  { name: "Rolls-Royce", logo: "https://logo.clearbit.com/rolls-roycemotorcars.com" },
  { name: "McLaren", logo: "https://logo.clearbit.com/mclaren.com" },
  { name: "Bugatti", logo: "https://logo.clearbit.com/bugatti.com" },
  { name: "Maserati", logo: "https://logo.clearbit.com/maserati.com" },
  { name: "Jaguar", logo: "https://logo.clearbit.com/jaguar.com" },
];

export default function CarBrandsGrid() {
  return (
    <section className="brands-section">
      <h2 className="brands-heading">Shop Cars by Brand</h2>
      <p className="brands-subheading">
        Find your next car by exploring brands we stock and import.
      </p>
      <div className="brands-logo-grid">
        {brands.map((b) => (
          <div className="brand-logo-wrap" key={b.name}>
            <img src={b.logo} alt={b.name} className="brand-logo-img" />
            <span className="brand-logo-name">{b.name.toUpperCase()}</span>
          </div>
        ))}
      </div>
      {/* SOCIAL MEDIA LINKS BELOW LOGOS */}
      <div className="social-links" style={{textAlign: 'center', margin: '24px 0'}}>
        <a href="https://facebook.com/valleyroadmotors" target="_blank" rel="noopener noreferrer" style={{color:'#e6b800', margin:'0 10px', fontSize:'1.5rem', display:'inline-block'}} aria-label="Facebook">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="https://instagram.com/valleyroadmotors" target="_blank" rel="noopener noreferrer" style={{color:'#e6b800', margin:'0 10px', fontSize:'1.5rem', display:'inline-block'}} aria-label="Instagram">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </section>
  );
}
