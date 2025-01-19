import React from "react";
import "../styles/style.css";

function CustomAlert({ message, onClose }) {
  return (
    <div className="custom-alert-overlay">
      <div className="custom-alert-box">
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
}

export default CustomAlert;
