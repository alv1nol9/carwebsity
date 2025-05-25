// frontend/src/components/Home.jsx
import React from 'react';
import HeroSection from './HeroSection';
import SearchBar from './SearchBar';
import CarGrid from './CarGrid';

const Home = () => {
  return (
    <>
      <HeroSection />
      <SearchBar />
      <CarGrid />
    </>
  );
};

export default Home;
