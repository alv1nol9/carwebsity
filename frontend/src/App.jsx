import React from 'react';
import { Routes, Route } from 'react-router-dom';


import CarDetails from './components/CarDetails';
import Login from './components/Login';
import AddCar from './components/AddCar';
import Navbar from './components/Navbar';
import Home from './components/Home';

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/add-car" element={<AddCar />} />
      </Routes>
    </>
  );
}

export default App;
