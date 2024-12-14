import React, { useState } from "react";
import '../styles/style.css';

const InputPanel = ({ onFindClick }) => {
  const [chargingType, setChargingType] = useState("");
  const [currentCharge, setCurrentCharge] = useState("");
  const [isPaid, setIsPaid] = useState(false); // State to manage Paid/Free toggle

  const handleSubmit = (e) => {
    e.preventDefault();

    // Invoke the passed-in function when "Find" is clicked
    if (onFindClick) {
      onFindClick(chargingType, isPaid, currentCharge);
    }
  };

  const togglePaid = () => {
    setIsPaid(!isPaid); // Toggle the Paid/Free state
  };

  return (
    <div className="panel">
      <h3 className="title">EV Info</h3>
      <form onSubmit={handleSubmit}>
        {/* Charging Type */}
        <label className="label">
          Charging Type:
          <select
            className="input"
            value={chargingType}
            onChange={(e) => setChargingType(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="fast">Fast Charging</option>
            <option value="normal">Normal Charging</option>
          </select>
        </label>

        {/* Current Charge */}
        <label className="label">
          Current Charge (%):
          <input
            type="number"
            className="input"
            value={currentCharge}
            onChange={(e) => setCurrentCharge(e.target.value)}
            placeholder="Enter current charge"
            min="0"
            max="100"
          />
        </label>

        {/* Paid/Free Toggle */}
        <label className="toggleLabel">
          <span>Free</span>
          <div
            className={`toggle ${isPaid ? "paid" : "free"}`}
            onClick={togglePaid}
          >
            <div
              className="toggleCircle"
              style={{ transform: isPaid ? "translateX(24px)" : "translateX(0)" }}
            />
          </div>
          <span>Paid</span>
        </label>

        <button type="submit" className="button">
          Find
        </button>
      </form>
    </div>
  );
};

export default InputPanel;
