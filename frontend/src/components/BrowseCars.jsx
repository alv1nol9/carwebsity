import React from "react";
import CarGrid from "./CarGrid"; 
import SearchBar from "./SearchBar";

export default function FeaturedCarsPage() {
  return (
   <div className="main-container">
  <SearchBar />
  <CarGrid />
</div>

  );
}
