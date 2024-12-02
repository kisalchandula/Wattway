import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Point } from 'ol/geom';
import { Feature } from 'ol';
import { Style, Circle, Fill, Stroke } from 'ol/style';
import { fromLonLat } from 'ol/proj';

const MapComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Sample charging station data
    const stations = [
      {
        name: 'Station 1',
        type: 'Fast Charger',
        coordinates: [8.4037, 49.0069], // Karlsruhe
      },
      {
        name: 'Station 2',
        type: 'Slow Charger',
        coordinates: [8.4094, 49.0142], // Nearby
      },
      {
        name: 'Station 3',
        type: 'Ultra-Fast Charger',
        coordinates: [8.3936, 49.0083], // Nearby
      },
    ];

    // Create features for each station
    const stationFeatures = stations.map((station) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(station.coordinates)),
        name: station.name,
        type: station.type,
      });
      feature.setStyle(
        new Style({
          image: new Circle({
            radius: 10,
            fill: new Fill({ color: 'green' }), 
            stroke: new Stroke({ color: '#fff', width: 2 }),
          }),
        })
      );
      return feature;
    });

    // Create vector source and layer for stations
    const stationSource = new VectorSource({
      features: stationFeatures,
    });

    const stationLayer = new VectorLayer({
      source: stationSource,
    });

    // Initialize map
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-d}.tile.openstreetmap.org/{z}/{x}/{y}.png', // OSM Light Theme
          }),
        }),
        stationLayer, // Add station layer
      ],
      view: new View({
        center: fromLonLat([8.4037, 49.0069]), // Center on Karlsruhe
        zoom: 14,
      }),
    });

    return () => map.setTarget(null);
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: 'calc(100vh - 60px)', // Adjust height to exclude navbar
        marginTop: '60px',            // Push map below the navbar
      }}
    ></div>
  );
};

export default MapComponent;
