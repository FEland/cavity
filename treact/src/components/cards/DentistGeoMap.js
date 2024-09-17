// src/components/DentistMap.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const DentistGeoMap = ({ dentist }) => {
//   const { name, street, city } = dentist;
  const name = dentist.Name;
  const street = dentist.Address_1;
  const Address_2 = dentist.Address_2;
  const city = dentist.Town_City
  const [position, setPosition] = useState([0, 0]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${city}&format=json`);
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setPosition([lat, lon]);
      }
    };

    fetchCoordinates();
  }, [street, city]);

  return (
    <div>
        hello
    <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
          url="https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=97720df4d6654597a9e74d24e57432e0"
        />
      <Marker position={position}>
        <Popup>
          {name}<br />{street}, {city}
        </Popup>
      </Marker>
    </MapContainer>
    </div>
  );
};

export default DentistGeoMap;
