import React from 'react';
import HeroSection from './HeroSection';
import SearchBar from './SearchBar';
import CarGrid from './CarGrid';

const Home = () => {
  return (
    <>
      <HeroSection />
      <SearchBar />
      <CarGrid />   {/* ← THIS is what actually shows the cars! */}
    </>
  );
};

export default Home;
