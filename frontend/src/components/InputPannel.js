import React, { useState } from "react";

const InputPanel = () => {
  const [chargingType, setChargingType] = useState("");
  const [currentCharge, setCurrentCharge] = useState("");
  const [range, setRange] = useState(100); // Default range is 100 km

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Charging Type: ${chargingType}, Current Charge: ${currentCharge}%, Range: ${range} km`
    );
    // You can replace this alert with API calls or state updates
  };

  return (
    <div style={styles.panel}>
      <h3 style={styles.title}>EV Info</h3>
      <form onSubmit={handleSubmit}>
        {/* Charging Type */}
        <label style={styles.label}>
          Charging Type:
          <select
            style={styles.input}
            value={chargingType}
            onChange={(e) => setChargingType(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="fast">Fast Charging</option>
            <option value="normal">Normal Charging</option>
          </select>
        </label>

        {/* Current Charge */}
        <label style={styles.label}>
          Current Charge (%):
          <input
            type="number"
            style={styles.input}
            value={currentCharge}
            onChange={(e) => setCurrentCharge(e.target.value)}
            placeholder="Enter current charge"
            min="0"
            max="100"
          />
        </label>

        {/* Range Slider */}
        <label style={styles.label}>
          Range (km): {range} km
          <input
            type="range"
            style={styles.slider}
            value={range}
            onChange={(e) => setRange(e.target.value)}
            min="0"
            max="100"
            step="2"
          />
        </label>

        <button type="submit" style={styles.button}>
          Find
        </button>
      </form>
    </div>
  );
};

const styles = {
  panel: {
    position: "absolute",
    bottom: "80px",
    left: "20px",
    width: "300px",
    padding: "15px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
  },
  title: {
    margin: "0 0 15px",
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "center", // Center text
  },
  label: {
    display: "block",
    margin: "10px 0",
    fontSize: "14px",
    fontWeight: "bold",
  },
  input: {
    display: "block",
    width: "100%",
    margin: "5px 0",
    padding: "4px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  slider: {
    width: "100%",
    marginTop: "10px",
  },
  button: {
    marginTop: "15px",
    padding: "10px",
    width: "100%",
    backgroundColor: "#007BFF",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};


export default InputPanel;
