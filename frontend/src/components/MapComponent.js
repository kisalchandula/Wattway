import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import station1 from './Assets/electricity.png'
import car from './Assets/pin.png'

const MapComponent = () => {
  const mapRef = useRef(null); // Reference to the map container
  const mapInstance = useRef(null); // Reference to the Leaflet map instance
  const chargeStationsLayer = useRef(null); // Layer for charge stations
  const routeLayer = useRef(null); // Layer for the route
  const userLocationLayer = useRef(null); // Layer for the user's location

  const ROUTING_API_KEY = '5b3ce3597851110001cf6248f6390103d37547ff9e7224f453b2ebb4'; // Replace with OpenRouteService API key
  const OPENCHARGE_API_KEY = 'a18b71f0-6ba9-4d0f-8998-810a0073b1de'; // Replace with Open Charge Map API key

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

      // Fetch and display user location, charging stations, and route
      getUserLocationAndChargingStations();
    }

    return () => {
      // Cleanup on unmount
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  const getUserLocationAndChargingStations = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
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

          // Fetch charging stations within a 10 km radius
          const stations = await fetchChargingStations(latitude, longitude);

          // Find the closest charging station
          if (stations && stations.length > 0) {
            const closestStation = findClosestStation(latitude, longitude, stations);

            if (closestStation) {
              // Show route to the closest charging station
              fetchRoute([longitude, latitude], [closestStation.Longitude, closestStation.Latitude]);
            }
          }

          // Optionally, center the map on the user's location
          mapInstance.current.setView([latitude, longitude], 14);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const fetchChargingStations = async (latitude, longitude) => {
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
  };

  const addMarkersToMap = (stations) => {
    // Clear previous markers
    chargeStationsLayer.current.clearLayers();

    // Add a marker for each station
    stations.forEach((station) => {
      const { AddressInfo } = station;

      if (AddressInfo) {
        const { Latitude, Longitude, Title } = AddressInfo;

        if (Latitude && Longitude) {
          const marker = L.marker([Latitude, Longitude], {
            icon: L.icon({
              iconUrl: station1,
              iconSize: [35, 47],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
            }),
          }).addTo(chargeStationsLayer.current);

          // Add a popup with station details
          marker.bindPopup(`
            <strong>${Title}</strong><br/>
            <em>${AddressInfo.AddressLine1 || ''}</em><br/>
            <em>${AddressInfo.Town || ''}</em><br/>
          `);
        }
      }
    });
  };

  const findClosestStation = (userLat, userLng, stations) => {
    let closestStation = null;
    let minDistance = Infinity;

    stations.forEach((station) => {
      const { AddressInfo } = station;

      if (AddressInfo) {
        const { Latitude, Longitude } = AddressInfo;

        if (Latitude && Longitude) {
          const distance = Math.sqrt(
            Math.pow(Latitude - userLat, 2) + Math.pow(Longitude - userLng, 2)
          );

          if (distance < minDistance) {
            minDistance = distance;
            closestStation = AddressInfo;
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

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: '89vh',
      }}
    ></div>
  );
};

export default MapComponent;
