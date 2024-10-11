// import React, { useState, useEffect } from 'react';
import React, { useEffect, useRef, useState } from 'react';

import tw, { styled } from 'twin.macro';
import supabase from 'demos/supabaseClient';

// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';


import { MapContainer, TileLayer, Marker, Popup as LeafletPopup, useMap} from 'react-leaflet';
// import { LatLngBounds } from 'leaflet';
// import DentistMap from 'components/cards/DentistMap-ClusterPassed.js'

import L from 'leaflet';

import { css } from "styled-components/macro"; //eslint-disable-line

// import L from 'leaflet';
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";
import ReactModalAdapter from "../../helpers/ReactModalAdapter.js";

// import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";
import { ReactComponent as toothIcon } from "images/twitter-icon.svg";
// import Hero from "components/hero/TwoColumnWithVideo.js";
// import Header from "../headers/light.js";
import { SectionHeading } from "components/misc/Headings";
import { ReactComponent as PriceIcon } from "feather-icons/dist/icons/dollar-sign.svg";
import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";
import { ReactComponent as StarIcon } from "feather-icons/dist/icons/star.svg";
import { ReactComponent as PhoneIcon } from "feather-icons/dist/icons/phone.svg";


import Switch from '@mui/material/Switch';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';

// import { ReactComponent as PlayIcon } from "feather-icons/dist/icons/play-circle.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";
import 'leaflet/dist/leaflet.css';
import customMarkerImage from 'images/tooth.png'; // Update with your image path
// import ThreeColumnWithProfileImage from 'components/testimonials/ThreeColumnWithProfileImage.js';
// import Autocomplete from './Autocomplete.js';

// import MarkerClusterGroup from "react-leaflet-markercluster";
// import useDebounce from './useDebounce'; // Import the debounce hook

import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';


const GridContainer = styled.div`
  ${tw`grid grid-cols-2 gap-4 p-4`}

`;

// const Card = styled.div`
//   ${tw`p-4 bg-gray-100 rounded-lg shadow-md cursor-pointer`}
// `;

const Card = styled.div`
  ${tw`relative p-4 bg-gray-100 rounded-lg shadow-md cursor-pointer`}
  transition: background-color 0.3s;

  &:hover {
    background-color: #e2e8f0; /* Change to your desired hover color */
  }

  &:hover::after {
    content: "Click for more info";
    ${tw`absolute inset-0 flex items-end justify-end text-lg font-semibold text-gray-700`}
  }

  @media (max-width: 640px) {
    &:hover::after {
      content: "";
    }

    &::after {
      content: "...";
      ${tw`absolute items-end justify-end text-lg font-semibold text-gray-700`}
    }
  }
`;

// const SearchField2 = styled.div`
//   ${tw`relative w-full max-w-lg p-4 bg-white border border-gray-300 rounded-full shadow-md`}
//   transition: background-color 0.3s;
//   width: 75vw; /* Set the width to 75% of the viewport width */
//   max-width: none; /* Remove max-width to ensure it takes full 75vw */
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #f7fafc; /* Change to your desired hover color */
//   }

//   input {
//     ${tw`w-full py-3 pl-4 pr-12 text-gray-700 bg-transparent border-none focus:outline-none`}
//     padding-right: 2.5rem; /* Ensure enough room for the placeholder text */

//   }

//   .icon {
//     ${tw`absolute inset-y-0 right-0 flex items-center pr-3`}
//   }

//   @media (max-width: 640px) {
//     width: 90vw; /* Adjust for smaller screens */

//     input {
//       ${tw`py-2 pl-3 pr-10`}
//     }
//   }
// `;

const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;

// const ImageColumn = tw(Column)`md:w-6/12 lg:w-5/12 flex-shrink-0 h-100 md:h-auto`;
const ImageColumn = tw(Column)`
  w-full md:w-6/12 
  flex-shrink-0 
  h-auto
`;
const TextColumn = styled(Column)(props => [
  tw`md:w-6/12 mt-8 md:mt-0`,
]);

// const Image = styled.div(props => [
//   `background-image: url("${props.imageSrc}");`,
//   tw`rounded bg-cover bg-center h-full`,
// ]);
// const TextContent = tw.div`lg:py-8`;

// const Actions = styled.div`
//   ${tw`relative max-w-md text-center mx-auto lg:mx-0`}
//   input {
//     ${tw`sm:pr-48 pl-8 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500`}
//   }
//   button {
//     ${tw`w-full sm:absolute right-0 top-0 bottom-0 bg-primary-500 text-gray-100 font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center sm:w-40 sm:leading-none focus:outline-none hover:bg-primary-900 transition duration-300`}
//   }
// `;

const TwoColumn = tw.div`flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-auto py-20 md:py-24`;

// const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;

// const LeftColumn = tw.div`relative lg:w-5/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left`;
// const RightColumn = tw.div`relative mt-12 lg:mt-0 flex-1 flex flex-col justify-center lg:self-end`;

// const SearchContainer = styled.div`
//   ${tw`flex relative w-full p-4 bg-white border border-gray-300 rounded-full shadow-md`}
//   width: 75vw; /* Set the width to 75% of the viewport width */
//   max-width: none; /* Remove max-width to ensure it takes full 75vw */
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #f7fafc; /* Change to your desired hover color */
//   }

//   .search-input {
//     ${tw`flex-grow w-3/4 py-3 pl-4 pr-12 text-gray-700 bg-transparent border-none focus:outline-none`}
//     border-right: 2px solid #ccc; /* Add a border to separate the two inputs */
//     // width: 75vw; /* Set the width to 75% of the viewport width */
    

//   }

//   .location-input {
//     ${tw`flex-grow w-1/4 py-3 pl-4 pr-2 text-gray-700 bg-transparent border-none focus:outline-none`}
//   }

//   .location-icon {
    
//     ${tw` w-1/6`} /* Margin to the left of the icon */
//     /* Adjust as needed for your icon size */
//   }

//   .icon {
//     ${tw`absolute inset-y-0 right-0 flex items-center pr-3`}
//   }

//   @media (max-width: 640px) {
//     width: 90vw; /* Adjust for smaller screens */

//     .search-input,
//     .location-input {
//       ${tw`py-2 pl-3 pr-10`}
//     }
//   }
// `;

const SearchContainer = styled.div`
  ${tw`flex relative w-full p-4 bg-white border border-gray-300 rounded-full shadow-md`}
  width: 75vw; /* Set the width to 75% of the viewport width */
  max-width: none; /* Remove max-width to ensure it takes full 75vw */
  transition: background-color 0.3s;

  &:hover {
    background-color: #f7fafc; /* Change to your desired hover color */
  }

  .search-input {
    ${tw`w-2/4 py-3 pl-4 pr-2 text-gray-700 bg-transparent border-none focus:outline-none`}
    border-left: 2px solid #ccc; /* Add a border to separate the two inputs */
    marginLeft: '40%', // Moves it one-quarter of the way in from the left
    border-right: 2px solid #ccc; /* Add a border to separate the two inputs */
  }

  .location-container {
    ${tw`flex items-center w-1/4`} /* Ensure the container takes up 25% */
  }

  .location-icon {
    ${tw`mr-2 mt-3 ml-4`} /* Adjust the margin-top to center the icon */
    /* Adjust size if necessary */
  }

  .location-input {
    ${tw`flex-grow py-3 pl-2 pr-2 text-gray-700 bg-transparent border-none focus:outline-none`}
  }
    .icon {
        ${tw`absolute inset-y-0 right-0 flex items-center pr-3`}
      }
    
  @media (max-width: 640px) {
    width: 90vw; /* Adjust for smaller screens */

    .search-input,
    .location-input {
      ${tw`py-2 pl-3 pr-2`}
    }
  }
`;

const SuggestionsList = styled.ul`
  ${tw`absolute w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-screen overflow-y-auto shadow-lg z-10`}
  width: 80%; /* Ensures the width matches the SearchField */

  li {
    ${tw`px-4 py-2 cursor-pointer`}
    transition: background-color 0.3s, font-weight 0.3s;

    &:hover {
      background-color: #f1f5f9; /* Light gray background on hover */
    }

    &.hovered {
      background-color: #e2e8f0; /* Slightly darker gray for hovered item */
    }

    &.pressed {
      font-weight: bold;
    }
  }
`;

// const PopupContainer = styled.div`
//   ${tw`fixed w-full h-full flex items-center justify-center bg-black bg-opacity-50`}
// `;

// const PopupContent = styled.div`
//   ${tw`bg-white p-8 rounded-lg shadow-lg relative`}
// `;

// const CloseButton = styled.button`
//   ${tw`absolute text-gray-500 hover:text-gray-700`}
// `;

const ControlButton = styled(PrimaryButtonBase)`
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2`}
  svg {
    ${tw`w-6 h-6`}
  }
`;
const PrimaryButton = tw.button`font-bold px-8 lg:px-10 py-3 rounded bg-primary-500 text-gray-100 hocus:bg-primary-700 focus:shadow-outline focus:outline-none transition duration-300`;

const PrevButton = tw(ControlButton)``;
const NextButton = tw(ControlButton)``;
const NoNextButton = styled(ControlButton)`
  ${tw`bg-gray-300 text-gray-600 hocus:bg-gray-300`}
`;


// const Subheading = tw.span`tracking-wider text-sm font-medium`;
// const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
const HighlightedTextInverse = tw.span`bg-gray-100 text-primary-500 px-4 transform -skew-x-12 inline-block`;
const Description = tw.span`flex inline-block mt-8`;
// const imageCss = tw`rounded-4xl`;


// const Actions = tw.div`flex flex-col items-center sm:flex-row justify-center lg:justify-start mt-8`;


const HeadingWithControl = tw.div`flex flex-col items-center sm:items-stretch sm:flex-row justify-between`;
const Heading = tw(SectionHeading)``;



const Container = tw.div`relative`;
const StyledModal = styled(ReactModalAdapter)`
  &.mainHeroModal__overlay {
    ${tw`fixed inset-0 z-50`}
  }
  &.mainHeroModal__content {
    ${tw`xl:mx-auto m-4 sm:m-16 max-w-screen-xl absolute inset-0 flex justify-center items-center rounded-lg bg-gray-200 outline-none`}
  }
  .content {
    ${tw`w-full lg:p-16`}
  }
`;
// const WatchVideoButton = styled.button`
//   ${tw`mt-4 sm:mt-0 sm:ml-8 flex items-center text-secondary-300 transition duration-300 hocus:text-primary-400 focus:outline-none`}
//   .playIcon {
//     ${tw`stroke-1 w-12 h-12`}
//   }
//   .playText {
//     ${tw`ml-2 font-medium`}
//   }
// `;

const CloseModalButton = tw.button`absolute top-0 right-0 mt-8 mr-8 hocus:text-primary-500`;

const Controls = tw.div`flex items-center`;


// const CardImage = styled.div(props => [
//     `background-image: url("${props.imageSrc}");`,
//     tw`flex w-1/3 h-1/3 sm:h-64 bg-cover bg-center rounded-full `

//   ]);
  
  const TextInfo = tw.div`py-6 sm:px-10 sm:py-6`;
  const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
  const Title = tw.h5`text-2xl font-bold`;
  
  const RatingsInfo = styled.div`
    ${tw`flex items-center sm:ml-4 mt-2 sm:mt-0`}
    svg {
      ${tw`w-6 h-6 text-yellow-500 fill-current`}
    }
  `;
  const Rating = tw.span`ml-2 font-bold`;
  
  const PhoneNumbersInfo = styled.div`
    ${tw`flex items-center sm:ml-4 mt-2 sm:mt-0`}
    svg {
      ${tw`w-6 h-6 text-blue-500 fill-current`}
    }
  `;
  const PhoneNumber = tw.span`ml-2 font-bold`;  
  const SecondaryInfoContainer = tw.div`flex flex-col sm:flex-row mt-2 sm:mt-4`;
  const IconWithText = tw.div`flex items-center mr-6 my-2 sm:my-0`;
  const IconContainer = styled.div`
    ${tw`inline-block rounded-full p-2 bg-gray-700 text-gray-100`}
    svg {
      ${tw`w-3 h-3`}
    }
  `;
  const Text = tw.div`ml-2 text-sm font-semibold text-gray-800`;


const blueArrowIcon = new L.Icon({
    iconUrl:  customMarkerImage, // Replace with your icon URL
    iconSize: [28, 28], // Size of the icon
    iconAnchor: [22, 38], // Point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // Point from which the popup should open relative to the iconAnchor
});

export default () => {

    // const [userLocation, setUserLocation] = useState('');
    let userLocation = '';
    const [userCoordinates, setuserCoordinates] = useState([51.5156177,-0.0919983]);

    const fetchUserLocation = async () => {
    try {
        const response = await fetch(`https://api.geoapify.com/v1/ipinfo?&apiKey=${process.env.REACT_APP_geoapifyKey }`)
        // const response = await fetch('https://api.geoapify.com/v1/ipinfo?&apiKey=6010e42b3c0d41b9a34dd332bd1e6d1a')
        .then(response => response.json());
        console.log(response);
        // setUserLocation(response.city.name);
        setSearchField('Town_City');
        setSearch(response.city.name);

        // console.log([response.location,response.location.Longitude]);
        setuserCoordinates([response.location.latitude,response.location.longitude]);
        // preLoadMapLocation(response.city.name);
        // userLocationData = response;
    }
        // setImgSrc(response.url);
        // }
    catch (error) {
        console.error('No location info:', error);
        }
    };

    const [dentists, setDentists] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDentist, setSelectedDentist] = useState(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);

//   const [imageSrc, setImgSrc] = useState("https://loremflickr.com/200/200?random=");

  const startIndex = page * pageSize;
  const endIndex = startIndex + pageSize;

//   const street = "Dizengof";
//   const city = "Tel Aviv";
  const [position, setPosition] = useState([55.1830955,-1.5911608]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => setModalIsOpen(!modalIsOpen);

  useEffect(() => {
    console.log("useffect line 376 called");
  const fetchDentists = async () => {
    const { data, error } = await supabase
      .from('Dentists1')
      .select('*')
    //   .range((page - 1) * pageSize, page * pageSize - 1);
      // console.log(data);
    if (error) {
      console.error('Error fetching cards:', error);
    } else {

      setDentists(data);
    }
  };

  fetchDentists();
  
}, [page, pageSize]);

const fetchCoordinates = async (dentist) => {
    // console.log(selectedDentist);
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${dentist.Address_1},${dentist.Town_City}&format=json`);
        const data = await response.json();
        if (data.length > 0) {
            const { lat, lon } = data[0];
            // console.log([lat, lon]);
            setPosition([lat, lon]);
        }
        }
    catch (error) {
        // Code to handle the error
        console.error('No TownCity found:', error);
        resetPosition();
        }
    setSelectedDentist(dentist);
  };


// const fetchProfileImage = async () => {
//     try {
//         const response = await fetch(`https://loremflickr.com/100/100?random=`);
//         console.log(response);
//         // setImgSrc(response.url);
//         }
//     catch (error) {
//         console.error('No profile image:', error);
//         }
//   };


  const resetPosition = () => {
    setPosition([55.1830955,-1.5911608]);
  };

  const openPopup = (dentist) => {
    // resetPosition();
    // setSelectedDentist(dentist);
    toggleModal();
    closePopup();
    fetchCoordinates(dentist);
    // fetchProfileImage();
    setIsPopupOpen(true);
  };


  const closePopup = () => {
    setIsPopupOpen(false);
    resetPosition();
    setSelectedDentist(null);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        console.log("escape key pressed");
        closePopup();
        resetSearch('');
        setPressedIndex(null);
        setHoveredIndex(null);
        setSuggestions([]);

        // resetPosition();
      }
    };
// escape key registerd for when card popup open or  suggestion popup open
    if (isPopupOpen || suggestions.length > 1) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };

  });

//   useEffect(() => {
//     fetchUserLocation();
//   }, []); // Empty array ensures this effect runs only once

  const [trigger, retrigger] = useState(1);

  const [search, setSearch] = useState('');

//   const [regularSearch, setRegularSearch] = useState('');
//   const [addressSearch, setAddressSearch] = useState('');

//   const resetRegularSearch = (value) => {
//     setPage(0);
//     setPressedIndex(null);
//     // setRegularSearch(value);
//   };


  const resetSearch = (value) => {
    setPage(0);
    // console.log("reseat ");
    // console.log(value);
    setPressedIndex(null);
    setSearch(value);
    // setAddressSearch(value);

    // resetFilterDentist(value);
  };

//   const resetSearchAddress = (value) => {
//     setSearchField("Town_City");
//     setPage(0);
//     // console.log("reseat ");
//     // console.log(value);
//     setPressedIndex(null);
//     setSearch(value);
//     setAddressSearch(value);
//     // resetFilterDentist(value);
//   };

  const [filDents, setDents] = useState([]);

  const resetPageSize = (value) => {
    setPage(0);
    setPageSize(value);
  };

  const [searchField, setSearchField] = useState('Town_City');

  const resetSearchField = (value) => {
    setSearchField(value);
    setPage(0);
    setSearch('');
    setSuggestions([]);
    setDents(dentists);

  };

//   const filteredDentists = dentists.filter(dentist =>
//     dentist[searchField].toLowerCase().includes(search.toLowerCase())
//   );

// const filteredDentists = search
//   ? dentists.filter(dentist =>
//       dentist[searchField].toLowerCase().includes(search.toLowerCase())
//     )
//   : dentists;

  // const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);;

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [pressedIndex, setPressedIndex] = useState(null);

  const panCoordinatesToSearch = async (value) => {
    // console.log(selectedDentist);

    if (searchField === 'Town_City'){
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${value[searchField]}&format=json`);
            const data = await response.json();
            if (data.length > 0) {
                const { lat, lon } = data[0];
                // console.log([lat, lon]);
                setPosition([lat, lon]);
                setuserCoordinates([lat, lon]);
            }
            }
        catch (error) {
            // Code to handle the error
            console.error('No TownCity found for', value[searchField]);
            resetPosition();
            }
    }
    if (searchField === 'Name'){
        console.log("winner Name type", value);
        fetchDentistsOfWinner(value)
    }

  };

  const fetchDentistsOfWinner = async (value) => {
    
    console.log("fetchwinnderDentName", value, searchField);
    const { data, error } = await supabase
      .from('Dentists3')
    //   .select('Address_1, Town_City, fakelat, fakelong, website')
    .select('*')
      .eq(searchField, value[searchField]).limit(1)
    
    console.log('Fetched winnder dentist:', data);
    if (error) {
      console.error('Error fetching data:', error);
    } else {
      if (data.length === 0) {
        console.log('No dentists found in the specified area.');
      }
      setDentists(data[0]);
      setuserCoordinates([data[0].Latitude, data[0].Longitude]);

    //   setCache((prevCache) => ({ ...prevCache, [boundsKey]: data }));
    }
  };

  const setChosenItem = ([index, value]) => {

    setPressedIndex(index);
    console.log(value);
  
    // if (searchField === "Dentist_Type"){
    //     resetSearch(value.name);
    // }
    // else {
    //     resetSearch(value[searchField]);
    // }
    resetSearch(value[searchField]);
    retrigger(trigger+1);
    panCoordinatesToSearch(value);
    // setDents(filDents[0])
    setSuggestions([]);

  };


  // const [inputValue, setInputValue] = useState('');
  // const [chosenItem, setChosenItem] = useState('');

  // const handleItemClick = (item) => {
  //   setInputValue(item);
  //   setChosenItem(item);
  //   console.log('Chosen item:', item);
  // };



  useEffect(() => {
    if (search.length > 0) {
        
          const fetchSuggestions = async () => {
                // console.log('location for suggestions :', userLocation);
            const { data, error } = await supabase
              .from('Dentists1')
              .select('*')
              .ilike(`${searchField}`, `%${search}%`);
            //   .ilike(`${searchField}`, `%${search}%`).eq('Town_City', 'London');
            //   .limit(8);
            //   .range(0,4);

            if (data) {
                
                // console.log(data);
                setDents(data);
                
                // Get distinct values
                const distinctData = Array.from(new Set(data.map(item => item[searchField])))
                  .map(value => ({ [searchField]: value })).slice(0, 4);
        
                setSuggestions(distinctData); // Set suggestions
                // console.log(distinctData);
                // setDents(distinctData);

              } else if (error) {
                console.error('Error fetching data:', error);
              }
            };
            fetchSuggestions();
        } 
  }, [search, searchField]);


  const drawMap = () => (
    <div>
              <TextInfo>
                <TitleReviewContainer>
                {/* <CardImage imageSrc={imageSrc} /> */}
                  <Title>{selectedDentist.Name}</Title>
                  <RatingsInfo>
                    <StarIcon />
                    <Rating>{selectedDentist.ID}</Rating>
                  </RatingsInfo>
                </TitleReviewContainer>

                <SecondaryInfoContainer>
                  <IconWithText>
                    <IconContainer>
                      <LocationIcon />
                    </IconContainer>
                    <Text>{selectedDentist.Address_1}</Text>
                    <Text>{selectedDentist.Address_2}</Text>
                    <Text>{selectedDentist.Postcode}</Text>
                    <Text>{selectedDentist.County}</Text>
                    <Text>{selectedDentist.Region}</Text>
                  </IconWithText>
                  <IconWithText>
                    <IconContainer>
                      <PriceIcon />
                    </IconContainer>
                    {/* <Text>{selectedDentist.pricingText}</Text> */}
                  </IconWithText>
                </SecondaryInfoContainer>
                <span/>
                <PhoneNumbersInfo>
                    <PhoneIcon />
                    <PhoneNumber> {selectedDentist.Phone_Number}</PhoneNumber>
                  </PhoneNumbersInfo>
                <Description>{selectedDentist.Treatment}</Description>
              </TextInfo>

      <p>{position}</p>
      <MapContainer center={position} zoom={5} style={
        {
            logo: toothIcon,
            height: '40vh', /* Full viewport height */
            width: '40vw',  /* Full viewport width */
            border: '6px solid #ccc', /* Optional: Add a border */

        }
        }  >
        <TileLayer url={`https://{s}.tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=${process.env.REACT_APP_thunderForestKey }`} />
        <Marker position={position} icon={blueArrowIcon} >
          <LeafletPopup>{selectedDentist.Address_1}</LeafletPopup>
        </Marker>
      </MapContainer>
      <PrimaryButton>Book Now</PrimaryButton>
      </div>
  );


// Fix for marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


const createClusterIcon = (cluster) => {
    const count = cluster.getChildCount();
    const size = Math.min(40 + count * 5, 70); // Control size based on count
    const color = count > 10 ? 'red' : count > 5 ? 'orange' : 'green'; // Color based on count
  
    return L.divIcon({
      html: `<div style="background-color: ${color}; width: ${size}px; height: ${size}px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">${count}</div>`,
      className: 'custom-cluster-icon',
      iconSize: L.point(size*10, size*10),
      iconAnchor: L.point(size / 2, size / 2),
    });
  };

// // Custom styling for clusters
// const getClusterIcon = (cluster) => {
//   const markersCount = cluster.getChildCount();
//   let color;

//   // Define colors based on the number of markers in the cluster
//   if (markersCount <= 10) {
//     color = '#1abc9c'; // Green for small clusters
//   } else if (markersCount <= 50) {
//     color = '#f39c12'; // Orange for medium clusters
//   } else {
//     color = '#e74c3c'; // Red for large clusters
//   }

//   return L.divIcon({
//     html: `
//       <div style="
//         font-size: 80px;  /* Increased font size */
//         font-weight: italics;
//       ">
//         ${markersCount}
//       </div>
//     `,
//     className: 'custom-cluster',
//     iconUrl: customMarkerImage,
//     iconSize: L.point(40, 40),
//     popupAnchor: [0, -20], // Adjust where the popup opens if necessary
//   });
// };

const DentistMap = ({ searchField, retrigger }) => {
//   const [cityFocus, setCityFocus] = useState(searchField);
  const [dentists, setDentists] = useState([]);
//   const [cache, setCache] = useState({});
  
//   const initialPosition = [51.5074, -0.3278];
  const markersRef = useRef(L.markerClusterGroup());
//   const searchfield = "London";
//   const [searchField2, setSearchField] = useState(searchField);


//   const handleInputChange = (e) => {
//     setSearchField(e.target.value);
//   };

  const fetchDentists = async (bounds) => {
    // const roundToInteger = (num) => Math.round(num);
    
    // const boundsKey = `${roundToInteger(bounds.getSouthWest().lat)},${roundToInteger(bounds.getSouthWest().lng)},${roundToInteger(bounds.getNorthEast().lat)},${roundToInteger(bounds.getNorthEast().lng)}`;

    // if (cache[boundsKey]) {
    //   console.log('Using cached data for bounds:', boundsKey);
    //   setDentists(cache[boundsKey]);
    //   return;
    // }
    console.log("i was asked to refresh", searchField, bounds, searchTerm);

    if (searchTerm ==='Town_City'){
        const { data, error } = await supabase
        .from('Dentists3')
        //   .select('Address_1, Town_City, fakelat, fakelong, website')
        .select('*')
        .eq(searchTerm, searchField)
        .gte('fakelat', bounds.getSouthWest().lat)
        .lte('fakelat', bounds.getNorthEast().lat)
        .gte('fakelong', bounds.getSouthWest().lng)
        .lte('fakelong', bounds.getNorthEast().lng);
        //   .select('Address_1, Town_City, Latitude, Longitude')
        //   .eq('Town_City', searchField)
        //   .gte('Latitude', bounds.getSouthWest().lat)
        //   .lte('Latitude', bounds.getNorthEast().lat)
        //   .gte('Longitude', bounds.getSouthWest().lng)
        //   .lte('Longitude', bounds.getNorthEast().lng)
        
        console.log('Fetched Dentists:', data);
        if (error) {
        console.error('Error fetching data:', error);
        } else {
        if (data.length === 0) {
            console.log('No dentists found in the specified area.');
        }
        setDentists(data);
        //   setCache((prevCache) => ({ ...prevCache, [boundsKey]: data }));
        }
    }
    if (searchTerm === 'Name') {
        console.log("hello Queen");
    }
  };

  useEffect(() => {
    if (markersRef.current) {
      const map = markersRef.current.mapInstance;
      if (map) {
        const bounds = map.getBounds();
        fetchDentists(bounds);
      }
    }
  }, );

  useEffect(() => {
    if (!dentists.length || !markersRef.current) return;

    markersRef.current.clearLayers(); 

    const markers = L.markerClusterGroup({
      iconCreateFunction: createClusterIcon,
    //   iconSize: L.point(40, 40, true),
      maxClusterRadius: 100,
      showCoverageOnHover: true,
    });

    dentists.forEach(dentist => {
      const lat = dentist.Latitude || dentist.fakelat;
      const lng = dentist.Longitude || dentist.fakelong;

      if (lat !== undefined && lng !== undefined) {

        const popupContent = `
            <div>
                <strong>${dentist.Address_1}</strong><br>
               ${dentist.Name}<br>
               ${dentist.Phone_Number ? `<a href="tel:${dentist.Phone_Number}">${dentist.Phone_Number}</a><br>`  : '' }
                ${dentist.Website ? `<a href="tel:${dentist.Website}" target="_blank" rel="noopener noreferrer">${dentist.Website}</a>` : dentist.URL ? `<a href="${dentist.URL}" target="_blank" rel="noopener noreferrer">${dentist.URL}</a>` : ''}
            </div>`;

        const marker = L.marker([lat, lng])
            .bindPopup(popupContent);
            // .bindPopup(dentist.Address_1);
        markers.addLayer(marker);
      } else {
        console.error('Invalid coordinates for dentist:', dentist);
      }
    });

    markersRef.current.addLayer(markers);
  }, [dentists]);

  const MapBoundsUpdater = () => {
    const map = useMap();

    useEffect(() => {
      markersRef.current.addTo(map);

      const handleMoveEnd = () => {
        const newBounds = map.getBounds();
        fetchDentists(newBounds);
      };

      map.on('moveend', handleMoveEnd);

      return () => {
        map.off('moveend', handleMoveEnd);
      };
    }, [map]);

    // useEffect(() => {
    //     markersRef.current.addTo(map);
    //     // console.log("i was triggers");

    //     // const handleMoveEnd = () => {
    //     const newBounds = map.getBounds();
    //     fetchDentists(newBounds);
    // //    };

    //     // map.on('moveend', handleMoveEnd);

    //     // return () => {
    //     // map.off('moveend', handleMoveEnd);
    //     // };
    // }, [trigger]);

    return null;
  };

//   const FlyToLocation = ({ searchField, initialPosition }) => {
//     const map = useMap();
//     const debouncedSearchField = useDebounce(searchField, 300); // 300ms delay
  
//     useEffect(() => {
//       if (debouncedSearchField) {
//         map.flyTo(initialPosition, map.getZoom());
//       }
//     }, [debouncedSearchField, map, initialPosition]);
  
//     return null;
//   };
  
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh' }}>
      {/* <input type="text" value={searchField2} onChange={handleInputChange} placeholder="Search city..." /> */}
    <MapContainer 
      center={userCoordinates} 
      zoom={12} 
      style={{ height: '40vw', width: '80%' }} 
    >
      <TileLayer
        url={`https://{s}.tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=${process.env.REACT_APP_thunderForestKey}`}
        attribution='&copy; <a href="https://www.thunderforest.com/">Thunderforest</a>'
      />
      <MapBoundsUpdater />
      {/* <FlyToLocation searchField={searchField} /> */}

    </MapContainer>
    </div>

  );
};


const [isOn, setIsOn] = useState(false); // State for toggle switch
const [searchTerm, setSearchTerm] = useState('Town_City'); // Default to 'Location'

const handleToggle = () => {
    setSearchTerm((prev) => (prev === 'Town_City' ? 'Name' : 'Town_City'));
    resetSearchField(searchTerm);
    setIsOn((prev) => !prev);
};



  return (
    
    <Container>
              <div id="search">

<HeadingWithControl>
<Heading>Popular Dentists</Heading>

{/* {filteredDentists.length > pageSize? ( */}

<Controls>
    <PrevButton onClick={() => setPage(page > 1 ? page - 1 : 0)}> <ChevronLeftIcon/></PrevButton>
    {/* <span> Page {page}</span> */}
    {startIndex + pageSize > filDents.length ? <NoNextButton> <ChevronRightIcon/> </NoNextButton> :
    <NextButton onClick={() => setPage(page + 1)}> <ChevronRightIcon/></NextButton>
        }
    <select onChange={(e) => resetPageSize(Number(e.target.value))} value={pageSize} >
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
    </select>
</Controls>
{/* ) : <div> nothin here </div>
} */}
</HeadingWithControl>




{/* <HeadingWithControl> */}
{/* <Heading> */}
<div>


    {/* <div>
        <FormLabel component="legend">Search by         
            Name{"   "}
            <FormControlLabel value="end" control={<Switch color="secondary" />}
            label="Location" labelPlacement="end"
            onClick={handleToggle} />
            </FormLabel>   
      </div> */}

<SearchContainer>
    {/* < > */}
        {/* <FormLabel component="legend">Search by         
            Name{"   "}
            <FormControlLabel value="end" control={<Switch color="secondary" />}
            label="Location" labelPlacement="end"
            onClick={handleToggle} />
            </FormLabel>    */}

            Search by Location{"   "} <Switch color="secondary" onClick={handleToggle}/> Name{"   "}      
      {/* </> */}

    <input type="text" placeholder={!isOn ? "Search by Dentist Name, Speciality" : userLocation ? userLocation : "Your Address or City..."}
        className="search-input" value={search}
        onChange={(e) => resetSearch(e.target.value)}
        onMouseLeave={() => setHoveredIndex(null)}
        // onFocus={() => setIsOpen(true)}
        />

        

<div className="location-icon">
    < LocationIcon onClick={() => fetchUserLocation()}/>
        </div>
{/* 
        <button onClick={() => fetchUserLocation()} >
              {userLocation ? userLocation : 'Find Me '}  < LocationIcon/>
        </button>   */}

    {/* <input
        type="text"
        className="location-input"
        placeholder={userLocation ? userLocation : 'City, Country' }
        onChange={(e) => resetSearchAddress(e.target.value)}
    /> */}

    <div className="icon">
        <svg className="w-5 h-5 text-gray-500" fill="blue" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.243 4.243a1 1 0 01-1.414 1.414l-4.243-4.243zM8 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
        </svg>
    </div>


    {/* <Controls>

        <select onChange={(e) => resetSearchField(e.target.value)} value={searchField}>
        <option value="Dentist_Type">Type of Dentist</option>
        <option value="Name">Name</option>
        <option value="Town_City">Address</option>
        <option value="Phone_Number">Phone Number</option>
        </select>
    </Controls> */}


</SearchContainer>

    {(suggestions.length > 0 && suggestions[0][searchField]!==search) && (
            <SuggestionsList>


        {/* item.name if it's from DentistType table, and item[searchfield] from dentist1 table */}
        {suggestions.map((item, index) => (
        <li key={index}
            // onMouseEnter={() => suggestSearchHover([item, index])}
            className={`${hoveredIndex === index ? 'hovered' : ''} ${pressedIndex === index ? 'pressed' : ''}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={(e) => setChosenItem([index, item])}
        > {item[searchField]}
        
        </li>
        ))}
            </SuggestionsList>

    )}
</div>
</div>

      <TwoColumn>
        <ImageColumn>
            <DentistMap searchField={search} />
        </ImageColumn>
        <TextColumn >
  


            {/* <DentistMap dentists={filDents.slice(startIndex, endIndex)} /> */}
            {/* <MapComponent2 dentist_list={filDents.slice(startIndex, endIndex)} /> */}

    {/* UNCOMMENT THESE BELOW */}
    <div>
        {filDents.length > 0 ? (
        <GridContainer>
            {filDents.slice(startIndex, endIndex).map((dentist, index) => (
            <Card key={index} onClick={() => openPopup(dentist)}>
                <Title>{dentist.Name}</Title>
                <HighlightedTextInverse>{dentist.Dentist_Type}</HighlightedTextInverse>
                <i>{dentist.Town_City}</i>
            </Card>
            ))}
        </GridContainer>
        )
        : (<TextInfo> No results, try adjusting your search... 🙃 </TextInfo>)}


        <Container>
            <StyledModal closeTimeoutMS={300} className="mainHeroModal" isOpen={modalIsOpen} onRequestClose={toggleModal} shouldCloseOnOverlayClick={true}>
            <CloseModalButton onClick={toggleModal}>
                <CloseIcon tw="w-6 h-6" />
            </CloseModalButton>
            <div >
                {isPopupOpen && selectedDentist && drawMap()}
            </div>
            </StyledModal>
        </Container>



{/* <MapComponent4 cityName={"London"} /> */}
{/* <DentistMap searchField={search} /> */}

        </div>
          
        </TextColumn>
      </TwoColumn>
    </Container>
   



  );
};



