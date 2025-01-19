import React, { useRef } from 'react';
import Navbar from './components/NavBar';
import MapComponent from './components/MapComponent';
import InputPanel from './components/InputPannel';

const App = () => {
  const mapRef = useRef(null); // Reference to MapComponent

  const handleFindClick = (chargingType, isPaid, currentCharge) => {
    if (mapRef.current) {
      mapRef.current.getUserLocationAndChargingStations(chargingType, isPaid, currentCharge);
    }
  };

  return (
    <div>
      <Navbar />
      <MapComponent ref={mapRef} />
      <InputPanel onFindClick={handleFindClick} />
    </div>
  );
};

export default App;
