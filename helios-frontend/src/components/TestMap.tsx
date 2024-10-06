'use client';

import React, { useRef, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvent } from 'react-leaflet';
import { Map as LeafletMap, Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const pinIcon = new Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const SimpleMap: React.FC = () => {
  const mapRef = useRef<LeafletMap | null>(null);
  const initialLatitude = 51.505;
  const initialLongitude = -0.09;
  const [position, setPosition] = useState<{ lat: number, lng: number }>({ lat: initialLatitude, lng: initialLongitude });

  const LocationMarker = () => {
    useMapEvent('click', (e) => {
      const { lat, lng } = e.latlng;
      setPosition({ lat, lng });
      console.log(`Latitude: ${lat}, Longitude: ${lng}`);
    });
    return null;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPosition((prevPosition) => ({
      ...prevPosition,
      [name]: value === '' ? 0 : parseFloat(value),
    }));
  };

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView([position.lat, position.lng], mapRef.current.getZoom());
    }
  }, [position]);

  return (
    <div style={{ position: 'relative' }}>
      <MapContainer
        center={[initialLatitude, initialLongitude]}
        zoom={13}
        whenCreated={(mapInstance) => { mapRef.current = mapInstance; }}
        style={{ height: '82.4vh', width: '70vw' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <LocationMarker />
        <Marker position={[position.lat, position.lng]} icon={pinIcon} />
      </MapContainer>
      <div style={{ position: 'absolute', top: '10px', left: '50px', backgroundColor: 'white', padding: '5px', borderRadius: '5px', zIndex: 1000 }}>
        <label>
          Latitude:
          <input
            type="number"
            name="lat"
            value={position.lat}
            onChange={handleInputChange}
            style={{ marginLeft: '5px' }}
          />
        </label>
        <br />
        <label>
          Longitude:
          <input
            type="number"
            name="lng"
            value={position.lng}
            onChange={handleInputChange}
            style={{ marginLeft: '5px' }}
          />
        </label>
      </div>
    </div>
  );
};

export default SimpleMap;