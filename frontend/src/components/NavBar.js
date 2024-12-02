import React from 'react';
import logo from '../Assets/logo192.png';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.leftSection}>
        <img
          src={logo}
          alt=""
          style={styles.logo}
        />
        <h1 style={styles.title}>Wattway</h1>
      </div>
      <h1 style={styles.centerText}>EV Charging Stations</h1>
    </nav>
  );
};

const styles = {
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '60px',
    backgroundColor: '#333',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', 
    padding: '0 20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    zIndex: 1000,
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: '40px',
    width: 'auto',
    marginRight: '10px',
  },
  title: {
    margin: 0,
    fontSize: '18px',
  },
  centerText: {
    margin: 0,
    fontSize: '16px',
    textAlign: 'center',
    flexGrow: 1, 
  },
};

export default Navbar;
