import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import styled from 'styled-components';
import Switch from '@mui/material/Switch';
import tw from 'twin.macro';
import supabase from 'demos/supabaseClient';

// Styled components
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-0 w-full h-screen`;
const LeftColumn = tw.div`relative lg:w-6/12 flex flex-col text-center max-w-lg lg:max-w-none lg:text-left border-r border-gray-300 overflow-y-auto`;
const RightColumn = tw.div`relative lg:w-6/12 flex flex-col justify-center lg:self-end h-full`;
const CardList = styled.div`${tw`max-h-full overflow-y-auto`}; padding: 20px;`;
const SearchContainer = styled.div`${tw`flex items-center justify-center w-full p-4 bg-white border border-gray-300 rounded-full shadow-md`} margin: 0 20px; transition: background-color 0.3s; &:hover { background-color: #f7fafc; } .search-input { ${tw`flex-grow py-3 px-4 text-gray-700 bg-transparent border-none focus:outline-none`} border-left: 2px solid #ccc; border-right: 2px solid #ccc; } @media (max-width: 640px) { margin: 0; width: 90vw; }`;
const SuggestionsList = styled.ul`${tw`absolute w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-full overflow-y-auto shadow-lg z-10`} width: 80%; margin-top: 10px; max-height: 150px; overflow-y: auto;`;
// const ToggleButtonContainer = styled.div`${tw`flex justify-center mt-4`} width: 100%; background-color: purple; color: white; text-align: center; padding: 10px; cursor: pointer;`;
// const MobileMapContainer = styled.div`${tw`absolute top-0 left-0 right-0 bottom-0`} z-index: 10;`;



const Search = () => {
    // eslint-disable-next-line
  const [dentists, setDentists] = useState([]);
  const [filteredDentists, setFilteredDentists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDentistId, setSelectedDentistId] = useState(null);
  const [hoveredDentistId, setHoveredDentistId] = useState(null);
  const [searchBy, setSearchBy] = useState('Town_City'); 
  const [suggestions, setSuggestions] = useState([]);
  const [cachedDentists, setCachedDentists] = useState([]);
  const suggestionsRef = useRef(); 
  const [mapPosition, setMapPosition] = useState([51.505, -0.09]);
  const markerRefs = useRef({}); 
//   const [showMap, setShowMap] = useState(false);


  const fetchInitialDentists = useCallback(async (townCity = 'London') => {
    const { data, error } = await supabase
      .from('Dentists3')
      .select('*')
      .eq('Town_City', townCity);

    if (error) console.error(error);
    else {
      setDentists(data);
      setFilteredDentists(data);
      setCachedDentists(data);
    }
  }, []);

  useEffect(() => {
    fetchInitialDentists();
  }, [fetchInitialDentists]);

  const handleSearch = async (term) => {
    setSearchTerm(term);
    const filtered = cachedDentists.filter(dentist => 
      dentist[searchBy]?.toLowerCase().startsWith(term.toLowerCase())
    );

    setSuggestions([...new Set(filtered.map(dentist => dentist[searchBy]))].slice(0, 4));
    setFilteredDentists(filtered);
    
    if (filtered.length > 0) {
      const firstDentist = filtered[0];
      const latitude = parseFloat(firstDentist.Latitude);
      const longitude = parseFloat(firstDentist.Longitude);
      if (!isNaN(latitude) && !isNaN(longitude)) {
        setMapPosition([latitude, longitude]);
      }
    } else {
      const { data, error } = await supabase
        .from('Dentists3')
        .select('*')
        .ilike(searchBy, `%${term}%`); 

      if (error) console.error(error);
      else {
        setFilteredDentists(data);
        setCachedDentists(prev => [...prev, ...data]);
      }
    }
  };

  const handleSuggestionClick = (value) => {
    const filtered = cachedDentists.filter(dentist => dentist[searchBy] === value);
    setFilteredDentists(filtered);
    
    if (filtered.length > 0) {
      setSelectedDentistId(filtered[0].id);
      const latitude = parseFloat(filtered[0].Latitude);
      const longitude = parseFloat(filtered[0].Longitude);
      if (!isNaN(latitude) && !isNaN(longitude)) {
        setMapPosition([latitude, longitude]);
        // setShowMap(true);

      }
    }
    setSearchTerm(value);
    setSuggestions([]);
  };

  const handleClickOutside = (event) => {
    if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div id="search">

    <TwoColumn>
      <LeftColumn>
        <SearchContainer>
          <span>
            Search by{' '}
            <strong style={{ color: searchBy === 'Name' ? 'black' : 'blue' }}>Name</strong> 
            <Switch
              checked={searchBy === 'Name'}
              onChange={() => setSearchBy(prev => (prev === 'Town_City' ? 'Name' : 'Town_City'))}
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            <strong style={{ color: searchBy === 'Town_City' ? 'black' : 'blue' }}>Location</strong>
          </span>
          <input
            className="search-input"
            type="text"
            placeholder={`Search by ${searchBy === 'Town_City' ? 'City' : 'Name or Address'}`}
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </SearchContainer>

        {suggestions.length > 0 && (
          <SuggestionsList ref={suggestionsRef}>
            {suggestions.map((suggestion, index) => (
              <li 
                key={index} 
                onClick={() => handleSuggestionClick(suggestion)}
                style={{ cursor: 'pointer' }}
              >
                {suggestion}
              </li>
            ))}
          </SuggestionsList>
        )}

        <CardList>
          {filteredDentists.map((dentist) => (
            <div 
              key={dentist.id} 
              onMouseEnter={() => setHoveredDentistId(dentist.id)}
              onMouseLeave={() => setHoveredDentistId(null)}
              onClick={() => {
                setSelectedDentistId(dentist.id);
                const latitude = parseFloat(dentist.Latitude);
                const longitude = parseFloat(dentist.Longitude);
                if (!isNaN(latitude) && !isNaN(longitude)) {
                  setMapPosition([latitude, longitude]);
                  
                  // Open the corresponding marker popup
                  if (markerRefs.current[dentist.id]) {
                    markerRefs.current[dentist.id].openPopup();
                  }
                }
              }}
              style={{
                padding: '10px',
                cursor: 'pointer',
                backgroundColor: hoveredDentistId === dentist.id ? '#f0f0f0' : 'white',
              }}
            >
              <h3>{dentist.Name} <i>, {dentist.Dentist_Type}</i></h3> 
              <p>{dentist.Address_1}, {dentist.Town_City}</p> 
            </div>
          ))}
        </CardList>
      </LeftColumn>
      <RightColumn>
        <MapContainer 
          dentists={filteredDentists} 
          selectedDentistId={selectedDentistId} 
          hoveredDentistId={hoveredDentistId} 
          setMapPosition={setMapPosition} 
          mapPosition={mapPosition} 
          setFilteredDentists={setFilteredDentists}
          setHoveredDentistId={setHoveredDentistId}
          setSelectedDentistId={setSelectedDentistId}
          markerRefs={markerRefs}
        />
      </RightColumn>
    </TwoColumn>
    </div>

  );
};
const MapViewUpdater = ({ selectedDentistId, dentists, mapPosition, markerRefs, zoomLevel}) => {
  const map = useMap();
  
  useEffect(() => {
    if (map && selectedDentistId) {
      const selectedDentist = dentists.find(dentist => dentist.id === selectedDentistId);
      if (selectedDentist) {
        const latitude = parseFloat(selectedDentist.Latitude);
        const longitude = parseFloat(selectedDentist.Longitude);
        if (!isNaN(latitude) && !isNaN(longitude)) {
          map.setView([latitude, longitude], Math.max(zoomLevel,16));
          if (markerRefs.current[selectedDentistId]) {
            markerRefs.current[selectedDentistId].openPopup();
          }
        }
      }
    }
      // eslint-disable-next-line
  }, [selectedDentistId, dentists, map, markerRefs]);
  

  return null;
};

// Memoized Popup Component
const DentistPopup = React.memo(({ dentist }) => (
  <Popup>
    <div>
      <strong style={{ fontSize: '1.5em' }}>{dentist.Name}</strong>
      <div style={{ margin: '10px 0' }} />
      {dentist.Provider_Name !== dentist.Name && (
        <div>
          <strong>Provider:</strong> {dentist.Provider_Name}
        </div>
      )}
      <div style={{ fontStyle: 'italic' }}>
        <strong>Specialty:</strong> {dentist.Dentist_Type}
      </div>
      <div style={{ margin: '10px 0' }} />
      <div style={{ fontSize: '0.9em' }}>
        <strong>Address:</strong> {dentist.Address_1}, {dentist.Town_City}
      </div>
      <div style={{ margin: '10px 0' }} />
      {dentist.Phone_Number && (
        <div>
          <strong>Phone:</strong> <a href={`tel:${dentist.Phone_Number}`}>{dentist.Phone_Number}</a>
        </div>
      )}
      {dentist.Website || dentist.URL ? (
        <div>
          <strong>Website:</strong> <a href={dentist.Website || dentist.URL} target="_blank" rel="noopener noreferrer">
            {dentist.Website || dentist.URL}
          </a>
        </div>
      ) : null}
    </div>
  </Popup>
));

const ZoomLevelDisplay = ({ zoomLevel }) => (
    <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1000, background: 'white', padding: '5px' }}>
      Zoom Level: {zoomLevel}
    </div>
  );
  
  const MapZoomHandler = ({ setZoomLevel }) => {
    const map = useMap();
  
    useEffect(() => {
      const handleZoomEnd = () => {
        setZoomLevel(map.getZoom());
      };
  
      map.on('zoomend', handleZoomEnd);
      
      // Set the initial zoom level
      setZoomLevel(map.getZoom());
  
      return () => {
        map.off('zoomend', handleZoomEnd);
      };
    }, [map, setZoomLevel]);
  
    return null; // This component does not render anything
  };
  
  const MapContainer = ({
    dentists,
    selectedDentistId,
    hoveredDentistId,
    setMapPosition,
    mapPosition,
    setFilteredDentists,
    setHoveredDentistId,
    setSelectedDentistId,
    markerRefs,
  }) => {
    const [zoomLevel, setZoomLevel] = useState(13); // Default zoom level
    const maxZoomLevel = 18; // Set your desired max zoom level
    const isAnimatingRef = useRef(false);
  
    const uniqueDentists = Array.from(
      new Map(dentists.map(dentist => [`${dentist.Address_1}-${dentist.Town_City}`, dentist])).values()
    );
  
    const handleMarkerClick = (dentist, lat, lng, e, zoomLevel) => {
    //   if (!isAnimatingRef.current) {
        console.log(dentist, lat, lng, e, zoomLevel);

        setSelectedDentistId(dentist.id);
        setMapPosition([lat, lng]);
        // e.target._map.setView([lat, lng], Math.max(15, zoomLevel), { animate: true }); // Adjust zoom level for click
        // setTimeout(() => {
        //   e.target.openPopup();
        // }, 300);
    //   }
    //   else{
    //     console.log("IDHAK");
    //   }
    };
  
    const handleClusterClick = () => {
      isAnimatingRef.current = true;
    };
  
    // Determine if the selected dentist would be clustered at zoom level 17
    const selectedDentist = dentists.find(dentist => dentist.id === selectedDentistId);
    const selectedDentistLat = selectedDentist ? parseFloat(selectedDentist.Latitude) : null;
    const selectedDentistLng = selectedDentist ? parseFloat(selectedDentist.Longitude) : null;
  
    const isSelectedDentistClustered = uniqueDentists.filter(dentist =>
      parseFloat(dentist.Latitude) === selectedDentistLat &&
      parseFloat(dentist.Longitude) === selectedDentistLng
    ).length > 1;

    if (isSelectedDentistClustered){
        console.log(uniqueDentists.filter(dentist =>
            parseFloat(dentist.Latitude) === selectedDentistLat &&
            parseFloat(dentist.Longitude) === selectedDentistLng
          ))
    }
  
    const shouldShowClusters = zoomLevel < 16 && !isSelectedDentistClustered;
  
    return (
      <>
        <ZoomLevelDisplay zoomLevel={zoomLevel} />
        <LeafletMap
          center={mapPosition}
          zoom={zoomLevel}
          maxZoom={maxZoomLevel}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url={`https://{s}.tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=${process.env.REACT_APP_thunderForestKey}`}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapZoomHandler setZoomLevel={setZoomLevel} />
          
          {shouldShowClusters ? (
            <MarkerClusterGroup
              options={{
                maxClusterRadius: 5,
                disableClusteringAtZoom: 16, // Prevent clustering at zoom level 17 and above
                spiderfyOnMaxZoom: false,
                showCoverageOnHover: true,
                zoomToBoundsOnClick: false,
              }}
              eventHandlers={{
                click: handleClusterClick,
              }}
            >
              {uniqueDentists.map((dentist) => {
                const lat = parseFloat(dentist.Latitude);
                const lng = parseFloat(dentist.Longitude);
  
                if (!isNaN(lat) && !isNaN(lng)) {
                  return (
                    <Marker
                      key={dentist.id}
                      position={[lat, lng]}
                      icon={L.divIcon({
                        className: 'custom-marker',
                        html: `<div style="background-color: ${selectedDentistId === dentist.id ? 'red' : (hoveredDentistId === dentist.id ? 'orange' : 'blue')}; width: 20px; height: 20px; border-radius: 50%;"></div>`,
                      })}
                      ref={(el) => { markerRefs.current[dentist.id] = el; }}
                      eventHandlers={{
                        mouseover: () => {
                          setHoveredDentistId(dentist.id);
                        },
                        mouseout: () => {
                          setHoveredDentistId(null);
                        },
                        click: (e) => {
                          handleMarkerClick(dentist, lat, lng, e, zoomLevel);
                        },
                      }}
                    >
                      <Popup>
                        <DentistPopup dentist={dentist} />
                      </Popup>
                    </Marker>
                  );
                }
                return null;
              })}
            </MarkerClusterGroup>
          ) : (
            uniqueDentists.map((dentist) => {
              const lat = parseFloat(dentist.Latitude);
              const lng = parseFloat(dentist.Longitude);
  
              if (!isNaN(lat) && !isNaN(lng)) {
                return (
                  <Marker
                    key={dentist.id}
                    position={[lat, lng]}
                    icon={L.divIcon({
                      className: 'custom-marker',
                      html: `<div style="background-color: ${selectedDentistId === dentist.id ? 'red' : (hoveredDentistId === dentist.id ? 'orange' : 'blue')}; width: 20px; height: 20px; border-radius: 50%;"></div>`,
                    })}
                    ref={(el) => { markerRefs.current[dentist.id] = el; }}
                    eventHandlers={{
                      mouseover: () => {
                        setHoveredDentistId(dentist.id);
                      },
                      mouseout: () => {
                        setHoveredDentistId(null);
                      },
                      click: (e) => {
                        handleMarkerClick(dentist, lat, lng, e, zoomLevel);
                      },
                    }}
                  >
                    <Popup>
                      <DentistPopup dentist={dentist} />
                    </Popup>
                  </Marker>
                );
              }
              return null;
            })
          )}
          <MapViewUpdater selectedDentistId={selectedDentistId} dentists={dentists} mapPosition={mapPosition} markerRefs={markerRefs} zoomLevel={zoomLevel}/>
        </LeafletMap>
      </>
    );
  };
  

export default Search;
