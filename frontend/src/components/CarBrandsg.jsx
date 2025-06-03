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
  { name: "Bentley", logo: "https://img.logo.dev/bentleymotors.com?token=pk_bulVufMiSXiuKfAtxVtX-w&retina=true"},
  { name: "Maserati", logo: "https://img.logo.dev/maserati.com?token=pk_bulVufMiSXiuKfAtxVtX-w&retina=true"},
  { name: "Land Rover", logo: "https://img.logo.dev/landrover.com?token=pk_bulVufMiSXiuKfAtxVtX-w&retina=true"},
  { name: "Lamborghini", logo: "https://img.logo.dev/lamborghini.com?token=pk_bulVufMiSXiuKfAtxVtX-w&retina=true"},
  { name: "Porsche", logo: "https://img.logo.dev/porsche.com?token=pk_bulVufMiSXiuKfAtxVtX-w&retina=true"},
  { name: "Rolls Royce", logo: "https://img.logo.dev/rollsroyce.com?token=pk_bulVufMiSXiuKfAtxVtX-w&retina=true"},
  { name: "Subaru", logo: "https://logo.clearbit.com/subaru.com" },
  { name: "Volkswagen", logo: "https://logo.clearbit.com/volkswagen.com" },
  { name: "Ford", logo: "https://logo.clearbit.com/ford.com" },
  { name: "Jeep", logo: "https://logo.clearbit.com/jeep.com" },
  { name: "Lexus", logo: "https://logo.clearbit.com/lexus.com" },
  // Add more brands as you want!
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
    </section>
  );
}
