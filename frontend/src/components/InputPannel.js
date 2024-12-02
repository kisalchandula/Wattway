import React, { useState } from 'react';

const InputPanel = ({ onSubmit }) => {
  const [chargingType, setChargingType] = useState('');
  const [currentCharge, setCurrentCharge] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ chargingType, currentCharge });
  };

  return (
    <div style={styles.panel}>
      <h2 style={styles.heading}>EV Info</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Charging Type:</label>
          <select
            style={styles.input}
            value={chargingType}
            onChange={(e) => setChargingType(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Fast">Fast</option>
            <option value="Slow">Slow</option>
            <option value="Standard">Standard</option>
          </select>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Current Charge (%):</label>
          <input
            type="number"
            style={styles.input}
            value={currentCharge}
            onChange={(e) => setCurrentCharge(e.target.value)}
            placeholder="Enter current charge"
          />
        </div>
        <button type="submit" style={styles.button}>Find</button>
      </form>
    </div>
  );
};

const styles = {
  panel: {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    zIndex: 2000, // Ensures it appears above the map
  },
  heading: {
    margin: '0 0 10px 0',
    fontSize: '18px',
  },
  inputGroup: {
    marginBottom: '10px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default InputPanel;
