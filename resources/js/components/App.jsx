import React, { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import HomePage from './HomePage';
import DevicePage from './DevicePage';
import SensorData from './SensorData'; // Pastikan file ini ada

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/pertanian.jpg')" }}>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full h-16 backdrop-blur-md bg-white/30 shadow-md px-6 flex justify-between items-center z-50">
        <div className="flex items-center space-x-2">
          <img src="/Logo.png" alt="Logo" className="h-8 w-8" />
          <span className="text-lg font-semibold">Autec</span>
        </div>

        <div className="space-x-6">
          <NavLink to="/" className={({ isActive }) => `hover:text-gray-300 ${isActive ? 'font-bold' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/device" className={({ isActive }) => `hover:text-gray-300 ${isActive ? 'font-bold' : ''}`}>
            Devices
          </NavLink>
          <NavLink to="/sensors" className={({ isActive }) => `hover:text-gray-300 ${isActive ? 'font-bold' : ''}`}>
            SensorData
          </NavLink>
        </div>

        <button
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200"
        >
          {isLoggedIn ? 'Logout' : 'Login'}
        </button>
      </nav>

      {/* Bagian Main yang akan berubah */}
      <main className="flex-grow mt-16 p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/device" element={<DevicePage />} />
          <Route path="/sensors" element={<SensorData />} />
        </Routes>
      </main>

      {/* Footer tetap di bawah */}
      <footer className="bg-green-600 text-white text-center p-4 w-full">
        <p>&copy; 2025 AgroTech. Semua Hak Dilindungi.</p>
      </footer>

    </div>
  );
};

export default App;