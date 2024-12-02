import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Point } from 'ol/geom';
import { Feature } from 'ol';
import { Style, Fill, Stroke, Circle as CircleStyle } from 'ol/style';
import { fromLonLat } from 'ol/proj';

const dummyStations = [
  { id: 1, name: 'Station A', coordinates: [8.448259, 49.018597], chargingType: 'Fast', capacity: 4 },
  { id: 2, name: 'Station B', coordinates: [8.4505, 49.0198], chargingType: 'Slow', capacity: 6 },
  { id: 3, name: 'Station C', coordinates: [8.4459, 49.0175], chargingType: 'Superfast', capacity: 2 },
  { id: 4, name: 'Station D', coordinates: [8.4495, 49.0210], chargingType: 'Fast', capacity: 3 },
  { id: 5, name: 'Station E', coordinates: [8.4467, 49.0160], chargingType: 'Slow', capacity: 5 },
];

const MapComponent = () => {
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([longitude, latitude]); 
      },
      (error) => {
        console.error('Error fetching user location:', error);
      }
    );
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    const stationSource = new VectorSource();

    dummyStations.forEach((station) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(station.coordinates)),
      });

      let fillColor;
      switch (station.chargingType) {
        case 'Fast':
          fillColor = '#4caf50'; 
          break;
        case 'Slow':
          fillColor = '#ff9800'; 
          break;
        case 'Superfast':
          fillColor = '#f44336'; 
          break;
        default:
          fillColor = '#9e9e9e'; 
      }

      feature.setStyle(
        new Style({
          image: new CircleStyle({
            radius: 8,
            fill: new Fill({ color: fillColor }),
            stroke: new Stroke({ color: '#fff', width: 2 }),
          }),
        })
      );

      stationSource.addFeature(feature);
    });

    const userSource = new VectorSource();

    if (userLocation) {
      const userFeature = new Feature({
        geometry: new Point(fromLonLat(userLocation)),
      });

      userFeature.setStyle(
        new Style({
          image: new CircleStyle({
            radius: 10,
            fill: new Fill({ color: '#2196f3' }), 
            stroke: new Stroke({ color: '#fff', width: 2 }),
          }),
        })
      );

      userSource.addFeature(userFeature);
    }

    // Create layers
    const stationLayer = new VectorLayer({ source: stationSource });
    const userLayer = new VectorLayer({ source: userSource });

    // Initialize the map
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-d}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          }),
        }),
        stationLayer,
        userLayer,
      ],
      view: new View({
        center: fromLonLat([8.448259, 49.018597]), 
        zoom: 14,
      }),
    });

    return () => map.setTarget(null);
  }, [userLocation]);

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: 'calc(100vh - 60px)', 
        marginTop: '60px',           
      }}
    ></div>
  );
};

export default MapComponent;
