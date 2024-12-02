import React from 'react';
import Navbar from './components/NavBar';
import MapComponent from './components/MapComponent';
import InputPanel from './components/InputPannel';

const App = () => {
  const handleUserInput = (data) => {
    console.log('User Input:', data);
    // Process or store the data as needed
  };

  return (
    <div>
      <Navbar />
      <MapComponent />
      <InputPanel onSubmit={handleUserInput} />
    </div>
  );
};

export default App;
