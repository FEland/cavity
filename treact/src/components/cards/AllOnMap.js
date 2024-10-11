import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import supabase from 'demos/supabaseClient'; // Updated import

// Fix for marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const DentistMap = ({ searchField }) => { // Updated component signature
  const [dentists, setDentists] = useState([]);
  const [cache, setCache] = useState({});
  const initialPosition = [51.5074, -0.1278];
  const markersRef = useRef();

  const fetchDentists = async (bounds) => {
    const roundToInteger = (num) => Math.round(num);
    
    const boundsKey = `${roundToInteger(bounds.getSouthWest().lat)},${roundToInteger(bounds.getSouthWest().lng)},${roundToInteger(bounds.getNorthEast().lat)},${roundToInteger(bounds.getNorthEast().lng)}`;

    if (cache[boundsKey]) {
      setDentists(cache[boundsKey]);
      return;
    }

    const { data, error } = await supabase
      .from('Dentists3')
      .select('Address_1, Town_City, fakelat, fakelong') // Updated table lookup
      .eq('Town_City', searchField) // Filtering by searchField
      .gte('fakelat', bounds.getSouthWest().lat)
      .lte('fakelat', bounds.getNorthEast().lat)
      .gte('fakelong', bounds.getSouthWest().lng)
      .lte('fakelong', bounds.getNorthEast().lng);
    
    console.log('Fetched Dentists:', data); // Log the fetched data
    if (error) {
      console.error(error);
    } else {
      if (data.length === 0) {
        console.log('No dentists found in the specified area.');
      }
      setDentists(data);
      setCache((prevCache) => ({ ...prevCache, [boundsKey]: data }));
    }
  };

  useEffect(() => {
    const map = markersRef.current;
    if (map) {
      const bounds = map.getBounds();
      fetchDentists(bounds);
    }
  }, []);

  useEffect(() => {
    if (!dentists.length || !markersRef.current) return;

    const markers = L.markerClusterGroup();

    dentists.forEach(dentist => {
      console.log(`Creating Marker for: ${dentist.Address_1}, Lat: ${dentist.fakelat}, Long: ${dentist.fakelong}`); // Log each dentist
      const marker = L.marker([dentist.fakelat, dentist.fakelong])
        .bindPopup(dentist.Address_1);
      markers.addLayer(marker);
    });

    console.log('Markers added to cluster:', markers.getLayers()); // Log added markers
    markersRef.current.addLayer(markers);
    console.log('Current Layers in MarkersRef:', markersRef.current.getLayers()); // Log current layers
  }, [dentists]);

  const MapBoundsUpdater = () => {
    const map = useMap();

    useEffect(() => {
      const handleMoveEnd = () => {
        const newBounds = map.getBounds();
        console.log('New Bounds:', newBounds); // Log the new bounds
        fetchDentists(newBounds);
      };

      map.on('moveend', handleMoveEnd);

      return () => {
        map.off('moveend', handleMoveEnd);
      };
    }, [map]);

    return null;
  };

  return (
    <MapContainer 
      center={initialPosition} 
      zoom={12} 
      style={{ height: '100vh', width: '100%' }} 
      whenCreated={mapInstance => { 
        markersRef.current = L.markerClusterGroup(); 
        mapInstance.addLayer(markersRef.current);
        console.log('Map Instance:', mapInstance); // Log map instance
      }}
    >
      <TileLayer
        url={`https://{s}.tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=${process.env.REACT_APP_thunderForestKey}`} // Updated tile layer URL
        attribution='&copy; <a href="https://www.thunderforest.com/">Thunderforest</a>'
      />
      <MapBoundsUpdater />
    </MapContainer>
  );
};

// export default DentistMap;
