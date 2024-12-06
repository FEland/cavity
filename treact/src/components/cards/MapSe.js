import React, { useState, useEffect, useRef, useCallback, useDeferredValue } from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import styled, { keyframes } from 'styled-components';
// import Switch from '@mui/material/Switch';
import tw from 'twin.macro';
import supabase from 'demos/supabaseClient';
// import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";
import { ReactComponent as DiagonalRightUp } from "images/diagonal-arrow-right-up-svgrepo-com.svg";
import { ReactComponent as ArrowLeftIcon } from "images/arrow-left-3-icon.svg";
import { ReactComponent as DownArrow } from "images/down-arrow-svgrepo-com (1).svg";
// import { Button } from '@mui/material';
// import zIndex from '@mui/material/styles/zIndex';

// import { v4 } from 'uuid';

// Styled components
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-0 w-full h-screen`;
const LeftColumn = tw.div`relative lg:w-6/12 flex flex-col text-center max-w-lg lg:max-w-none lg:text-left border-r border-gray-300 overflow-y-auto`;
const RightColumn = tw.div`relative lg:w-6/12 flex flex-col justify-center lg:self-end h-full`;
const CardList = styled.div`${tw`max-h-full overflow-y-auto`}; padding: 20px;`;
// const SearchContainer = styled.div`
//   ${tw`relative items-center justify-center w-full px-4 py-4 bg-white border border-gray-300 rounded-full shadow-md mx-5`} 
//   transition: background-color 0.3s;
  
//   &:hover {
//     background-color: #f7fafc;
//   }

//   .search-input {
//     ${tw`flex-grow py-3 px-4 text-gray-700 bg-transparent border-none focus:outline-none`}
//     border-left: 2px solid #ccc;
//     border-right: 2px solid #ccc;
//   }

//   @media (max-width: 640px) {
//     margin: 0;
//     width: 90vw;
//   }
// `;

const Heading = tw.h1`
  flex text-2xl sm:text-3xl md:text-3xl lg:text-5xl text-primary-500 leading-none items-center
`;

const CenteredWrapper = tw.div`
  flex justify-center items-center
`;
// Styled Container for the search bar
const SearchContainer = styled.div`
${tw`flex flex-col lg:flex-row justify-between items-center w-full px-4 py-4 bg-white border border-gray-300 shadow-md max-w-4xl mx-auto rounded-lg`};
gap: 16px;

/* Ensure inputs adjust well within the container */
.search-input,
.location-input,
.insurance-input {
  ${tw`w-full lg:w-96 py-2 px-4 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
}


/* Make sure the button takes up full width on mobile */
.search-button {
  ${tw`w-72 sm:w-auto px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none`}
}

/* Mobile-first: Stack the inputs and button vertically */
@media (max-width: 1023px) {
  ${tw`flex-col`};
  gap: 12px;
}

/* Desktop: Layout inputs side-by-side */
@media (min-width: 1024px) {
  ${tw`flex-row`};
}
`;

// const OpenNewTabButton = (dentist) => {
//   return (
//     <button 
//       className="arrow-button" 
//       style={styles.button}
//       onClick={() => window.open(`/dentist/${dentist}`, '_blank')}
//     >
//       <span style={styles.arrow}></span>
//     </button>
//   );
// };

// const styles = {
//   button: {
//     display: 'inline-flex',
//     alignItems: 'center',
//     backgroundColor: '#000000',  // Green background
//     color: 'purple',
//     border: 'none',
//     fontSize: '10px',
//     padding: '5px 5px',
//     // cursor: 'pointer',
//     // position: 'relative',
//   },
//   arrow: {
//     // display: 'inline-block',
//     // width: '0',
//     // height: '',
//     // marginLeft: '10px', // Space between text and arrow
//     borderLeft: '5px solid transparent',
//     borderRight: '5px solid transparent',
//     borderBottom: '5px solid white', // Creates the arrow
//     transform: 'rotate(45deg)', // Rotates the arrow to face upwards
//   }
// };

const bounce = keyframes`
  0% {
    transform: translateY(60px); /* Initial position */
  }
  50% {
    transform: translateY(66px); /* Move up */
  }
  100% {
    transform: translateY(60px); /* Return to initial position */
  }
`;

// Styled component for the arrow SVG
const BouncingArrowSVG = styled.svg`
  animation: ${bounce} 1s infinite; /* Apply the bounce animation */
  ml-1; /* Space between text and arrow */

`;

// const SuggestionsList = styled.ul`
//   ${tw`absolute w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-[150px] overflow-y-auto shadow-lg z-10`}
//   width: 80%;
//   margin-top: 10px;
//   max-height: 150px;
//   overflow-y: auto;
// `;

// Styled component for Suggestions List
const SuggestionsList = styled.ul`
  ${tw`absolute w-72 bg-white border border-gray-300 rounded-lg max-h-[150px] overflow-y-auto shadow-lg z-10 transition duration-300`}
  position: absolute;  /* Position it absolutely */
`;

// const ToggleButtonContainer = styled.div`${tw`flex justify-center mt-4`} width: 100%; background-color: purple; color: white; text-align: center; padding: 10px; cursor: pointer;`;
// const MobileMapContainer = styled.div`${tw`absolute top-0 left-0 right-0 bottom-0`} z-index: 10;`;
// const BackToListButton = styled.button`${tw`absolute top-0 left-0 p-2 bg-white border rounded shadow`} cursor: pointer;`;

const Actions = styled.div`
  ${tw`relative max-w-md text-center mx-auto lg:mx-0`}
  input {
    ${tw`sm:pr-48 pl-8 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500`}
  }
  button {
    ${tw`w-full sm:absolute right-0 top-0 bottom-0 bg-primary-500 text-gray-100 font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center sm:w-40 sm:leading-none focus:outline-none hover:bg-primary-900 transition duration-300`}
  }
`;


const isMobile = window.matchMedia("(max-width: 768px)").matches;


const Search = () => {


    const [userLocation, setUserLocation] = useState('');
    const fetchUserLocation = async () => {
    try {
        const response = await fetch(`https://api.geoapify.com/v1/ipinfo?&apiKey=${process.env.REACT_APP_geoapifyKey }`)
        // const response = await fetch('https://api.geoapify.com/v1/ipinfo?&apiKey=6010e42b3c0d41b9a34dd332bd1e6d1a')
        .then(response => response.json());
        console.log(response);
        setUserLocation(response.city.name)
        // userLocationData = response;
    }
        // setImgSrc(response.url);
        // }
    catch (error) {
        console.error('No location info:', error);
        }
    };

    // eslint-disable-next-line
  const [dentists, setDentists] = useState([]);
  const [filteredDentists, setFilteredDentists] = useState([]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const [secondSearchTerm, setSecondSearchTerm] = useState('');
  const deferredsecondSearchTerm = useDeferredValue(secondSearchTerm);

  const [selectedDentistId, setSelectedDentistId] = useState(null);
  const [hoveredDentistId, setHoveredDentistId] = useState(null);
  const [searchBy, setSearchBy] = useState('Town_City'); 
  const [suggestions, setSuggestions] = useState([]);
  const [cachedDentists, setCachedDentists] = useState([]);
  const suggestionsRef = useRef(); 
  const [mapPosition, setMapPosition] = useState([51.505, -0.09]);
  const markerRefs = useRef({}); 
  const [showMap, setShowMap] = useState(false); // Track map visibility
  const [theyTypedLocation, setTheyTypedLocation] = useState(false);

  const [inputValue, setInputValue] = useState('test');
  const [secondInputValue, setSecondInputValue] = useState('test');
  const [placeholder, setPlaceholder] = useState('City, Region, or PostCode'); // Start with initialLocation as placeholder


  useEffect(() => {
    // fetchUserLocation();
    setPlaceholder(userLocation);
    setInputValue(userLocation);
 

  }, [userLocation]);

  // useEffect(() => {
  //   // fetchUserLocation();
  //   // setPlaceholder(userLocation);

  //   // if (userLocation!== ''){
  //   //   setPlaceholder('City, Region, or PostCode');
  //   // }
  //   if (theyTypedLocation && (inputValue !== userLocation)) {
  //     setPlaceholder('City, Region, or PostCode');
  //   }
  //   else {
  //     setPlaceholder("hello");
  //     fetchUserLocation();
  //     setPlaceholder(userLocation);
  //   }
  //      // If input is empty, use default placeholder
  // }, [inputValue]); // Only run when inputValue changes

  const handleSecondInputChange = (e) => {
    // setTheyTypedLocation(true);
    setSecondInputValue(e);
    handleNameSearch(e);
  };

  const handleInputChange = (e) => {
    setTheyTypedLocation(true);
    setInputValue(e);
    handleLocationSearch(e);
  };

  const fetchInitialDentists = useCallback(async (townCity = 'London') => {
    fetchUserLocation();
    if (!isMobile) {
      setShowMap(true);
    }
    
    const { data, error } = await supabase
      .from('Dentists3')
      .select('*')
      .eq('Town_City', townCity)
      

    if (error) console.error(error);
    else {
      setDentists(data);
      setFilteredDentists(data);
      setCachedDentists(data);
      if (!isMobile) showMap(true);
    }
  }, [showMap]);

  useEffect(() => {
    fetchInitialDentists();
  }, [fetchInitialDentists]);


  const handleLocationSearch = async (term) => {
    // handleInputChange(term);
    setSearchBy('Town_City');
    setSearchTerm(term);

    console.log(inputValue);
    console.log(secondInputValue);
    console.log(placeholder);

    const filtered = cachedDentists.filter(dentist => 
      dentist[searchBy]?.toLowerCase().startsWith(term.toLowerCase())
    );

    setSuggestions([...new Set(filtered.map(dentist => dentist[searchBy]))].slice(0, 5));
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
        .ilike(searchBy, `%${term}%`)
        

      if (error) console.error(error);
      else {
        setFilteredDentists(data);
        setCachedDentists(prev => [...prev, ...data]);
      }
    }
    if (showMap) {
        setShowMap(false);
      }
  };
  //NO CACHING
  // const handleNameSearch = async (term) => {
  //   setSecondSearchTerm(term);
  //   setSearchBy('Name');
        
  //   const { data, error } = await supabase
  //     .from('Dentists3')
  //     .select('*')
  //     .ilike(searchBy, `%${term}%`)
  //     // .eq('Town_City', deferredSearchTerm);    // Filter by the Town_City

  //     if (error) console.error(error);
  //     else {
  //       setFilteredDentists(data);
  //       setSuggestions([...new Set(data.map(dentist => dentist[searchBy]))].slice(0, 5));
  //       setCachedDentists(prev => [...prev, ...data]);
  //     }
  //   if (isMobile && showMap) {
  //       setShowMap(false);
  //     }
  // };
//CACHING
  const handleNameSearch = async (term) => {
    setSecondSearchTerm(term);
    setSearchBy('Name');
    const filtered = cachedDentists.filter(dentist => 
      dentist[searchBy]?.toLowerCase().startsWith(term.toLowerCase())
    );

    setSuggestions([...new Set(filtered.map(dentist => dentist[searchBy]))].slice(0, 5));
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
        .ilike(searchBy, `%${term}%`)
        // .eq('Town_City', deferredSearchTerm);    // Filter by the Town_City


      if (error) console.error(error);
      else {
        setFilteredDentists(data);
        setCachedDentists(prev => [...prev, ...data]);
      }
    }
    if (showMap) {
        setShowMap(false);
      }
  };


  // //OLD ALL SEARCHES
  // const handleSearch = async (term) => {
  //   setSearchTerm(term);
  //   const filtered = cachedDentists.filter(dentist => 
  //     dentist[searchBy]?.toLowerCase().startsWith(term.toLowerCase())
  //   );

  //   setSuggestions([...new Set(filtered.map(dentist => dentist[searchBy]))].slice(0, 4));
  //   setFilteredDentists(filtered);
    
  //   if (filtered.length > 0) {
  //     const firstDentist = filtered[0];
  //     const latitude = parseFloat(firstDentist.Latitude);
  //     const longitude = parseFloat(firstDentist.Longitude);
  //     if (!isNaN(latitude) && !isNaN(longitude)) {
  //       setMapPosition([latitude, longitude]);
  //     }
  //   } else {
  //     const { data, error } = await supabase
  //       .from('Dentists3')
  //       .select('*')
  //       .ilike(searchBy, `%${term}%`); 

  //     if (error) console.error(error);
  //     else {
  //       setFilteredDentists(data);
  //       setCachedDentists(prev => [...prev, ...data]);
  //     }
  //   }
  //   if (showMap) {
  //       setShowMap(false);
  //     }
  // };


  const handleSuggestionClick = (value) => {
    const filtered = cachedDentists.filter(dentist => dentist[searchBy] === value);
    setFilteredDentists(filtered);
    
    if (filtered.length > 0) {
      setSelectedDentistId(filtered[0].id);
      const latitude = parseFloat(filtered[0].Latitude);
      const longitude = parseFloat(filtered[0].Longitude);
      if (!isNaN(latitude) && !isNaN(longitude)) {
        setMapPosition([latitude, longitude]);
        setShowMap(true);

      }
    }
    if (searchBy === 'Town_City'){ setSearchTerm(value)}
    else {
      setSecondSearchTerm(value);
    }
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

  // const openTab = (dentistID) => {
  //       const url = `/dentist/${dentistID}`;
  //       // Open the URL in a new tab
  //     // Delay to give the browser time to process the current tab action first
  //     setTimeout(() => {
  //       window.open(url, '_blank');
  //   }, 100);
  //     };


  const handleBackToList = () => {
    setShowMap(false); // Hide map when going back to list
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // const inputRef = useRef(null); // Ref for the input field
  // const inputPosition = inputRef.current ? inputRef.current.getBoundingClientRect() : { top: 0, left: 0, width: 0 };

  return (
    <div id="search">

<CenteredWrapper>
    <Heading> Start Your Search Today <BouncingArrowSVG><DownArrow style={{ width: '30px'}}/> </BouncingArrowSVG></Heading>
</CenteredWrapper>

<SearchContainer>
  {/* Search Input */}
  <span>

    <div className="container mx-auto px-4 py-8">

      <div className="text-xl mb-4 flex items-center">
        {/* Begin Search Text */}

        {/* Search Input Wrapper */}
        <div className="search-input-wrapper relative flex flex-col sm:flex-row sm:space-x-4 gap-4 w-full">
          {/* General Search Input */}
          <input
            type="text"
            placeholder="Condition, procedure, doctor..."
            value={deferredsecondSearchTerm}
            onChange={(e) => handleSecondInputChange(e.target.value)}
            className="search-input w-full sm:w-1/2 p-3 gap-4  border rounded-md"
          />


          {/* Location Input */}
          <input
            type="text"
            placeholder={ !theyTypedLocation ? userLocation : 'City, Region, or PostCode'}
            value={deferredSearchTerm}
            onChange={(e) => handleInputChange(e.target.value)}
            className="search-input w-full sm:w-1/2 p-3 border rounded-md"
          />


          {/* Search Button */}
          <button type="submit"  onClick={() => fetchInitialDentists()} className="search-button p-3 bg-blue-500 text-white rounded-md">
            Find Care
          </button>
        </div>
        {!isMobile && suggestions.length > 0 && (
          <Actions>
            <SuggestionsList ref={suggestionsRef}>
              {suggestions.map((suggestion, index) => (
      
                <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="cursor-pointer hover:bg-gray-300 hover:border-gray-400 transition-colors duration-300 p-4 border border-transparent absolute top-full left-0 w-full z-10 mt-1"
                >
                {suggestion}
              </li>
              ))}
            </SuggestionsList>
          </Actions>
        )}

      
      </div>
    </div>
  </span>
</SearchContainer>


{/*  
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
          <input
            className="search-input"
            type="text"
            placeholder={userLocation}
            value={searchTerm}
            onChange={(e) => handleLocationSearch(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
          < LocationIcon/>
          <Actions>

        <button onClick={() => fetchUserLocation()} >
        {userLocation ? userLocation : 'Find Me '}  < LocationIcon/>
        </button>            
        </Actions> 
        </SearchContainer>
*/}
    <TwoColumn>
      <LeftColumn>
        
        {/* {!isMobile && suggestions.length > 0 && (
            <Actions>
          <SuggestionsList ref={suggestionsRef}>
            {suggestions.map((suggestion, index) => (
              <li 
                key={index} 
                onClick={() => handleSuggestionClick(suggestion)}
                style={{ cursor: 'pointer' }}
              >
                        <Suspense fallback={<h2>Loading...</h2>}>

                {suggestion} 
                </Suspense>

              </li>
            ))}
          </SuggestionsList>
          </Actions>
        )} */}

{!isMobile && (<CardList>
          {filteredDentists.map((dentist) => (
            <div 
              key={dentist.id} 
              onMouseEnter={() => {setHoveredDentistId(dentist.id); setShowMap(true)}}
              onMouseLeave={() => setHoveredDentistId(null)}
              onClick={() => {
                setSelectedDentistId(dentist.id);
                setShowMap(true);
                
                const latitude = parseFloat(dentist.Latitude);
                const longitude = parseFloat(dentist.Longitude);
                // const map = useMap();

                if (!isNaN(latitude) && !isNaN(longitude)) {
                  markerRefs.current[dentist.id].openPopup()
                //   handleFly([latitude, longitude]);
                //   setMapPosition([latitude, longitude]);
                  // s
                  // Open the corresponding marker popup
                //   if (markerRefs.current[dentist.id]) {
                //     markerRefs.current[dentist.id].openPopup();
                //   }
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
             )}

{/* MOBILE */}

{isMobile && !showMap && (<CardList>

          {filteredDentists.map((dentist) => (
            <div 
              key={dentist.id} 
              onMouseEnter={() => setHoveredDentistId(dentist.id)}
              onMouseLeave={() => setHoveredDentistId(null)}
              onClick={() => {
                setSelectedDentistId(dentist.id);
                setShowMap(true);
                // setShowCards(false);
                const latitude = parseFloat(dentist.Latitude);
                const longitude = parseFloat(dentist.Longitude);
                if (!isNaN(latitude) && !isNaN(longitude)) {
                  setMapPosition([latitude, longitude]);
                  setTimeout(() => {
                    if (markerRefs.current[dentist.id]) {
                        markerRefs.current[dentist.id].openPopup();
                    }
                  }, 500);
                //   // Open the corresponding marker popup
                //   if (markerRefs.current[dentist.id]) {
                //     markerRefs.current[dentist.id].openPopup();
                //   }
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
             )}

 

      </LeftColumn>
      <RightColumn>

      {showMap && (
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
        >
          {isMobile && showMap && (

<ArrowLeftIcon onClick={handleBackToList} style={{ height: '30%', width: '30%' , zIndex: '99'}}> Back to list </ArrowLeftIcon>
)}

          </MapContainer>
        )}

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
            map.flyTo([latitude, longitude], Math.max(zoomLevel,16));
        //   map.setView([latitude, longitude], Math.max(zoomLevel,16));
        //   if (markerRefs.current[selectedDentistId]) {
        //     markerRefs.current[selectedDentistId].openPopup();
        //   }
            setTimeout(() => {
                if (markerRefs.current[selectedDentistId]) {
                    markerRefs.current[selectedDentistId].openPopup();
                }
            }, 300);
        }
      }
    }
      // eslint-disable-next-line
  }, [selectedDentistId, dentists, map, markerRefs]);
  

  return null;
};

// const openTab = (dentistID) => {
//   const url = `/dentist/${dentistID}`;
//   // Open the URL in a new tab
// // Delay to give the browser time to process the current tab action first
// setTimeout(() => {
//   window.open(url, '_blank');
// }, 100);
// };

const DentistPopup = ({ dentist }) => (

    <>
{dentist ? (
  <Popup>
    <div>
      <div>
      </div>
      <a
      href={`/dentist/${dentist.id}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',   // Use flexbox to align text and arrow side by side
        alignItems: 'center',     // Vertically center text and the arrow
        textDecoration: 'none',   // Remove underline from link
        fontSize: '16px',         // Adjust font size
        color: 'black',           // Text color
      }}
    >
      <strong style={{ fontSize: '1.2em' }} > {dentist.Name} </strong> 

      <DiagonalRightUp style={{ marginLeft: '8px' }} /> {/* Add space between text and arrow */}
    </a>
      <div style={{ margin: '10px 0' }} />
      {dentist.Provider_Name !== dentist.Name && (
        <div >
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
  </Popup> ) : <div> No Info </div>}
  </>
);

const ZoomLevelDisplay = ({ zoomLevel }) => (
    <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 20, background: 'white', padding: '5px' }}>
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
    // const isAnimatingRef = useRef(false);
  
    const uniqueDentists = Array.from(
      new Map(dentists.map(dentist => [`${dentist.Address_1}-${dentist.Town_City}`, dentist])).values()
    );
  
    const handleMarkerClick = (dentist, lat, lng, e, zoomLevel) => {
    //   if (!isAnimatingRef.current) {
        // console.log(dentist, lat, lng, e, zoomLevel);

        setSelectedDentistId(dentist.id);
        setMapPosition([lat, lng]);
        // e.target._map.setView([lat, lng], Math.max(15, zoomLevel), { animate: true }); // Adjust zoom level for click
        setTimeout(() => {
          e.target.openPopup();
        }, 200);
    //   }
    //   else{
    //     console.log("IDHAK");
    //   }
    };
  
    // const handleClusterClick = () => {
    //   isAnimatingRef.current = true;
    // };
  
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
          style={{ height: '100%', width: '100%', zIndex: 10}}
        >
          <TileLayer
            url={`https://{s}.tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=${process.env.REACT_APP_thunderForestKey}`}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapZoomHandler setZoomLevel={setZoomLevel} />
          
          {shouldShowClusters ? (
            <MarkerClusterGroup
              options={{
                // key: v4(),
                maxClusterRadius: 5,
                disableClusteringAtZoom: 16, // Prevent clustering at zoom level 16 and above
                spiderfyOnMaxZoom: false,
                showCoverageOnHover: true,
                zoomToBoundsOnClick: false,
              }}
            //   eventHandlers={{
            //     click: handleClusterClick,
            //   }}
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
                    {selectedDentistId === dentist.id ? 
                      (<Popup>
                        <DentistPopup dentist={dentist} />
                        </Popup>) :
                    //    (<Popup>
                    //     CHIPMUNKS
                    //   </Popup>)
                      null
                    }
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
                        // console.log("clicked", dentist);
                        handleMarkerClick(dentist, lat, lng, e, zoomLevel);
                      },
                    }}
                  >
                    {selectedDentistId === dentist.id ? 
                      (<Popup>
                        <DentistPopup dentist={dentist} />
                        {/* {dentist.id} */}
                      </Popup>) :
                    //    (<Popup>
                    //     CHIPMUNKS
                    //   </Popup>)
                    null
                    }
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
