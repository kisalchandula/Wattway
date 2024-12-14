import React from 'react';
import logo from './Assets/logo192.png';
import '../styles/style.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="leftSection">
        <img src={logo} alt="Wattway Logo" className="logo" />
        <h1 className="title">Wattway</h1>
      </div>
      <h1 className="centerText">EV Charging Stations</h1>
    </nav>
  );
};

export default Navbar;
