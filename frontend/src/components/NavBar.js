import React from 'react';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h1 style={styles.title}>Wattway - Electric Charging Stations</h1>
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
    justifyContent: 'center',
    zIndex: 1000, // Ensures navbar stays above the map
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
  },
  title: {
    margin: 0,
    fontSize: '18px',
  },
};

export default Navbar;
