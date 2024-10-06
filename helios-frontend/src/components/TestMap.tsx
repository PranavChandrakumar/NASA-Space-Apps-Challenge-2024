'use client';

import React, { useRef, useState } from 'react';
import { MapContainer, TileLayer, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const SimpleMap: React.FC = () => {
  const mapRef = useRef(null);
  const latitude = 51.505;
  const longitude = -0.09;
  const [position, setPosition] = useState<{ lat: number, lng: number } | null>(null);

  const LocationMarker = () => {
    useMapEvent('click', (e) => {
      const { lat, lng } = e.latlng;
      setPosition({ lat, lng });
      console.log(`Latitude: ${lat}, Longitude: ${lng}`);
    });
    return null;
  };

  return (
    <div style={{ position: 'relative' }}>
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        ref={mapRef}
        style={{ height: '82.4vh', width: '70vw' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <LocationMarker />
        {position && (
          <div style={{ position: 'absolute', top: '10px', left: '50px', backgroundColor: 'white', padding: '5px', borderRadius: '5px', zIndex: 1000 }}>
            <p>Latitude: {position.lat}</p>
            <p>Longitude: {position.lng}</p>
          </div>
        )}
      </MapContainer>
    </div>
  );
};

export default SimpleMap;