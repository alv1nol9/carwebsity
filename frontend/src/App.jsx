import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CarDetails from './components/CarDetails';
import Login from './components/Login';
import Register from './components/Register';
import AddCar from './components/AddCar';
import AdminRoute from './components/AdminRoute';
import About from './components/About'; 
import Contact from './components/Contact'; 
import CarsPage from './components/CarsPage';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <h2 className="text-3xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="mb-6">Sorry, we couldn’t find the page you’re looking for.</p>
      <Navigate to="/" replace />
    </div>
  );
}

export default function App() {
  return (
    <>
      {/* Global navigation bar */}
      <Navbar />

      {/* Main content area */}
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
         <Route path="/cars" element={<CarsPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin/add-car"
            element={
              <AdminRoute>
                <AddCar />
              </AdminRoute>
            }
          />
          {/* Catch-all for unknown routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}
