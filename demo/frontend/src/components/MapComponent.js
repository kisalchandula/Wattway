import React, { useEffect, useRef, forwardRef, useImperativeHandle, useState, useCallback } from 'react';
import UserAlert  from './CustomAleart';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import chargingPoint from './Assets/electricity.png';
import car from './Assets/pin.png';
import '../styles/style.css';

const MapComponent = forwardRef((props, ref) => {
  const mapRef = useRef(null); 
  const mapInstance = useRef(null); 
  const chargeStationsLayer = useRef(null); 
  const routeLayer = useRef(null); 
  const userLocationLayer = useRef(null); 

  const [alertMessage, setAlertMessage] = useState(""); // Alert state
  const [showAlert, setShowAlert] = useState(false); // Alert visibility

  const ROUTING_API_KEY = '5b3ce3597851110001cf6248f6390103d37547ff9e7224f453b2ebb4'; 
  const OPENCHARGE_API_KEY = 'a18b71f0-6ba9-4d0f-8998-810a0073b1de'; 

  const fetchChargingStations = useCallback(async (latitude, longitude) => {
    const radius = 10; // 10 km radius
    const url = `https://api.openchargemap.io/v3/poi/?key=${OPENCHARGE_API_KEY}&latitude=${latitude}&longitude=${longitude}&distance=${radius}&distanceunit=KM`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data && Array.isArray(data)) {
        addMarkersToMap(data);
        return data;
      }
    } catch (error) {
      console.error('Error fetching charging station data:', error);
    }
    return [];
  }, [OPENCHARGE_API_KEY]);

  useEffect(() => {
    if (!mapInstance.current) {
      // Initialize the map
      mapInstance.current = L.map(mapRef.current).setView([49.417, 8.686], 14); // Center on Karlsruhe

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);

      // Initialize layer groups
      chargeStationsLayer.current = L.layerGroup().addTo(mapInstance.current);
      routeLayer.current = L.layerGroup().addTo(mapInstance.current);
      userLocationLayer.current = L.layerGroup().addTo(mapInstance.current);




      navigator.geolocation.getCurrentPosition(
        async (position,) => {
          const { latitude, longitude } = position.coords;

          // Add a marker for the user's current location
          const userMarker = L.marker([latitude, longitude], {
            icon: L.icon({
              iconUrl: car,
              iconSize: [50, 50],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
            }),
          }).addTo(userLocationLayer.current);

          userMarker.bindPopup(`<strong>Current Vehicle Location</strong>`).openPopup();

        
        
        // Optionally, center the map on the user's location
        mapInstance.current.setView([latitude, longitude], 14);

        // Fetch charging stations within a 10 km radius  
        await fetchChargingStations(latitude, longitude);
      });
      


    }

    return () => {
      // Cleanup on unmount
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [fetchChargingStations]);

  const getUserLocationAndChargingStations = (chargingType, isPaid, currentCharge) => {
    const rangePerPercent = 3; // Assume 1% charge equals 3 km range
    const vehicleRange = currentCharge * rangePerPercent;
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
  
          // Fetch charging stations within 10 km radius
          const stations = await fetchChargingStations(latitude, longitude);
  
          // Find the closest charging station
          if (stations && stations.length > 0) {
            const closestStation = findClosestStation(latitude, longitude, stations, chargingType, isPaid);
  
            if (closestStation) {
              const distanceToStation = calculateDistance(
                latitude,
                longitude,
                closestStation.Latitude,
                closestStation.Longitude
              );
  
              if (distanceToStation <= vehicleRange) {
                // Proceed to fetch route
                fetchRoute([longitude, latitude], [closestStation.Longitude, closestStation.Latitude]);
              } else {
                showCustomAlert("No Station available within range.");
              }
            } else {
              showCustomAlert("No Closest Station available with search criteria.");
            }
          }
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const showCustomAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };
  
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
  
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };
  

 

  const addMarkersToMap = (stations) => {
    // Clear previous markers
    chargeStationsLayer.current.clearLayers();
  
    // Add a marker for each station
    stations.forEach((station) => {
      const { AddressInfo, Connections, UsageCost, MediaItems } = station; // UsageCost holds the cost information
  
      if (AddressInfo) {
        const { Latitude, Longitude, Title } = AddressInfo;
  
        if (Latitude && Longitude) {
          const supportsFastCharging = Connections?.some(
            (connection) => connection.Level?.IsFastChargeCapable
          );
  
          // Determine if the station is Free or Paid
          const isPaid = UsageCost && UsageCost.trim() !== ""; // Check if UsageCost is provided and not empty
          const costInfo = isPaid ? `Paid` : `Free`;

          // Retrieve the thumbnail URL if available
          const thumbnailUrl = MediaItems && MediaItems[0].ItemThumbnailURL;
  
          // Marker for each station
          const marker = L.marker([Latitude, Longitude], {
            icon: L.icon({
              iconUrl: chargingPoint,
              iconSize: [35, 47],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
            }),
          }).addTo(chargeStationsLayer.current);
  
          marker.bindPopup(`
              <strong>${Title}</strong><br/>
              <em>${AddressInfo.AddressLine1 || ''}</em><br/>
              <em>${AddressInfo.Town || ''}</em><br/>
              <strong>Fast Charging:</strong> ${supportsFastCharging ? 'Yes' : 'No'}<br/>
              <strong>Cost:</strong> ${costInfo}<br/>
               ${thumbnailUrl ? `<img src="${thumbnailUrl}" alt="${Title}" style="width: 100px; height: auto; margin-top: 5px;" />` : ''}
          `);
        }
      }
    });
  };

  const findClosestStation = (userLat, userLng, stations, chargingType, isPaid) => {
    let closestStation = null;
    let minDistance = Infinity;
  
    stations.forEach((station) => {
      const { AddressInfo, Connections, UsageCost } = station;
  
      if (AddressInfo && Connections) {
        const { Latitude, Longitude } = AddressInfo;
  
        if (Latitude && Longitude) {
          // Determine if the station matches the selected charging type
          const supportsFastCharging = Connections.some(
            (connection) => connection.Level?.IsFastChargeCapable
          );
  
          const isMatchingType =
            (chargingType === "fast" && supportsFastCharging) ||
            (chargingType === "normal" && !supportsFastCharging);
  
          // Determine if the station is Paid or Free
          const isFreeStation =
            !UsageCost || UsageCost.trim().toLowerCase() === "Free of charge";
  
          const matchesPaidFilter = isPaid ? !isFreeStation : isFreeStation;
  
          if (isMatchingType && matchesPaidFilter) {
            // Calculate distance
            const distance = Math.sqrt(
              Math.pow(Latitude - userLat, 2) + Math.pow(Longitude - userLng, 2)
            );
  
            if (distance < minDistance) {
              minDistance = distance;
              closestStation = AddressInfo;
            }
          }
        }
      }
    });
  
    return closestStation;
  };
  
  
  
  

  const fetchRoute = async (start, end) => {
    try {
      const response = await fetch(
        `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ROUTING_API_KEY}&start=${start.join(',')}&end=${end.join(',')}`
      );

      const data = await response.json();

      if (data && data.features && data.features[0]) {
        const coordinates = data.features[0].geometry.coordinates;

        // Convert coordinates to Leaflet-friendly format ([lat, lng])
        const route = coordinates.map(([lng, lat]) => [lat, lng]);

        // Clear previous route
        routeLayer.current.clearLayers();

        // Add the route to the map
        const polyline = L.polyline(route, { color: 'blue', weight: 5 }).addTo(routeLayer.current);

        // Adjust the map view to fit the route
        mapInstance.current.fitBounds(polyline.getBounds());
      }
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

  // Expose the function to the parent via ref
  useImperativeHandle(ref, () => ({
    getUserLocationAndChargingStations,
  }));

  return (
    <>
      <div ref={mapRef} className="map-container"></div>
      {showAlert && <UserAlert message={alertMessage} onClose={() => setShowAlert(false)} />}
    </>
    
  );
});

export default MapComponent;
