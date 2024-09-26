import React, { useState, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import supabase from 'demos/supabaseClient';
import { MapContainer, TileLayer, Marker, Popup as LeafletPopup } from 'react-leaflet';
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

// import { ReactComponent as PlayIcon } from "feather-icons/dist/icons/play-circle.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";
import 'leaflet/dist/leaflet.css';
import customMarkerImage from 'images/tooth.png'; // Update with your image path
// import ThreeColumnWithProfileImage from 'components/testimonials/ThreeColumnWithProfileImage.js';
// import Autocomplete from './Autocomplete.js';




const GridContainer = styled.div`
  ${tw`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4`}
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

const SearchField = styled.div`
  ${tw`relative w-full max-w-lg p-4 bg-white border border-gray-300 rounded-full shadow-md`}
  transition: background-color 0.3s;
  width: 75vw; /* Set the width to 75% of the viewport width */
  max-width: none; /* Remove max-width to ensure it takes full 75vw */
  transition: background-color 0.3s;

  &:hover {
    background-color: #f7fafc; /* Change to your desired hover color */
  }

  input {
    ${tw`w-full py-3 pl-4 pr-12 text-gray-700 bg-transparent border-none focus:outline-none`}
    padding-right: 2.5rem; /* Ensure enough room for the placeholder text */

  }

  .icon {
    ${tw`absolute inset-y-0 right-0 flex items-center pr-3`}
  }

  @media (max-width: 640px) {
    width: 90vw; /* Adjust for smaller screens */

    input {
      ${tw`py-2 pl-3 pr-10`}
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
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${dentist.Town_City}&format=json`);
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

//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     if (query.length > 2) {
//       fetchResults(query);
//     } else {
//       setResults([]);
//     }
//   }, [query]);

//   const fetchResults = async (searchQuery) => {
//     const { data, error } = await supabase
//     .from('Dentists1')
//     .select('*')
//       .ilike('Address_1', `%${searchQuery}%`);

//     if (error) {
//       console.error('Error fetching data:', error);
//     } else {
//         // console.log(data);
//       setResults(data);
//     }
//   };

//   const handleSelect = (dentist) => {
//     // console.log(dentist);
//     setQuery(dentist.Address_1);
//     setIsOpen(false);
//   };
  const [search, setSearch] = useState('');


  const resetSearch = (value) => {
    setPage(0);
    // console.log("reseat ");
    // console.log(value);
    setPressedIndex(null);
    setSearch(value);
    // resetFilterDentist(value);
  };

  const [filDents, setDents] = useState([]);

//   const filteredDentists = search
//   ? dentists.filter(dentist =>
//       dentist[searchField].toLowerCase().includes(search.toLowerCase())
//     )
//   : dentists;

//   const resetFilterDentist = (search) => {
//     if (search){
//         console.log(`search value is "${search.toLowerCase().trim()}"`);
       
//         // const searchField = 'name'; // Make sure this matches your data structure
//         // const search = 'eisk';

//         const temp = dentists.filter(dentist => {
//             const fieldValue = dentist[searchField]?.toLowerCase().trim(); // Get the value
//             // console.log(`dentist[searchfield] is: "${fieldValue}"`); // Log the value being checked

//             return fieldValue.includes(search.toLowerCase().trim()); // Check for match
//         });
//         // console.log(`temp after "${length(dentists)}"`);

//         setDents(temp);
//     }
//     else{
//         console.log("FAILED HERE");
//         setDents(dentists);
//     }
//   };


  const resetPageSize = (value) => {
    setPage(0);
    setPageSize(value);
  };

  const [searchField, setSearchField] = useState('Dentist_Type');

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

  const setChosenItem = ([index, value]) => {

    setPressedIndex(index);
  
    // if (searchField === "Dentist_Type"){
    //     resetSearch(value.name);
    // }
    // else {
    //     resetSearch(value[searchField]);
    // }
    resetSearch(value[searchField]);

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

            const { data, error } = await supabase
              .from('Dentists1')
              .select('*')
              .ilike(`${searchField}`, `%${search}%`)
            //   .limit(8);
            //   .range(0,4);

            if (data) {
                
                console.log(data);
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
            // if (!error) {
              
              
            // //     console.log(data);
            // //     const uniqueResults = Array.from(new Set(data.map(item => item.searchField)))
            // //     .map(name => {
            // //       return data.find(item => item.searchField === name);
            // //     });
            // //     console.log(uniqueResults);

            // //   setSuggestions(uniqueResults);
            // setSuggestions(data);
            // }
            // else {
            //   console.log("failed");
            // }
        //   console.log("here");
        //   console.log(suggestions);

        // fetchSuggestions();
  }, [search, searchField]);


//   useEffect(() => {
//     if (search.length > 0) {
//         if (searchField === "Dentist_Type"){
//           const fetchSuggestions = async () => {
//             const { data, error } = await supabase
//               .from('dentist_types')
//               .select('name')
//               .ilike('name', `%${search}%`)
//               .range(0,4);

//             if (!error) {
//               setSuggestions(data);
//             }
//           };
//           fetchSuggestions();
//         } 
//         else {
//           const fetchSuggestions = async () => {

//             const { data, error } = await supabase
//               .from('Dentists1')
//               .select(`${searchField}`)
//               .ilike(`${searchField}`, `%${search}%`)
//             //   .limit(8);
//             //   .range(0,4);

//             if (data) {
                

//                 // Get distinct values
//                 const distinctData = Array.from(new Set(data.map(item => item[searchField])))
//                   .map(value => ({ [searchField]: value }));
        
//                 setSuggestions(distinctData); // Set suggestions
//                 // console.log(distinctData);
//                 // setDents(distinctData);

//               } else if (error) {
//                 console.error('Error fetching data:', error);
//               }
              
//             // if (!error) {
              
              
//             // //     console.log(data);
//             // //     const uniqueResults = Array.from(new Set(data.map(item => item.searchField)))
//             // //     .map(name => {
//             // //       return data.find(item => item.searchField === name);
//             // //     });
//             // //     console.log(uniqueResults);

//             // //   setSuggestions(uniqueResults);
//             // setSuggestions(data);
//             // }
//             // else {
//             //   console.log("failed");
//             // }
//           };
//         //   console.log("here");
//         //   console.log(suggestions);
//           fetchSuggestions();
//         } 
//         // fetchSuggestions();
//       }
//   }, [search, searchField]);


  const drawMap = () => (
    // <PopupContainer>
    // <PopupContent>
    <div>
      {/* <CloseButton onClick={closePopup}>×</CloseButton> */}
      {/* <button onClick={closePopup}>Close</button> */}

      {/* <h2>{selectedDentist.name}</h2>
      <p>{selectedDentist.Address_1}</p>
      <p>{selectedDentist.Address_2}</p>
      <p>{selectedDentist.Town_City}</p> */}


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

      <MapContainer center={position} zoom={13} style={
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



  return (
    <div onClick={(e) => setSuggestions([])}>


{/* <Autocomplete />*/}


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


  <SearchField >
  <Controls>
      <input
          type="text"
          placeholder={`Search by Dentist, Location, Speciality, Procedure...`}
          value={search}
          onChange={(e) => resetSearch(e.target.value)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          
          // onFocus={() => setIsOpen(true)}
        />
        <div className="icon">
          <svg className="w-5 h-5 text-gray-500" fill="blue" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.243 4.243a1 1 0 01-1.414 1.414l-4.243-4.243zM8 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
          </svg>
        </div>

            <Controls>

                <select onChange={(e) => resetSearchField(e.target.value)} value={searchField}>
                <option value="Dentist_Type">Type of Dentist</option>
                <option value="Name">Name</option>
                <option value="Town_City">Address</option>
                <option value="Phone_Number">Phone Number</option>
                </select>
            </Controls>
        </Controls>

</SearchField>

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

              >{item[searchField]}
              
              </li>
            ))}
                  </SuggestionsList>

        )}
        </div>
        {/* </Heading> */}


      {/* </HeadingWithControl> */}

      {/* {isOpen && results.length > 0 && (
        <ul>
          {results.map((item, index) => (
            <li key={index} onClick={() => handleSelect(item)}>
              {item.type}
            </li>
          ))}
        </ul>
      )} */}


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

      {/* {isPopupOpen && selectedDentist && drawMap()} */}

      {/* {isPopupOpen && selectedDentist && (
        <PopupContainer>
          <PopupContent>
            <CloseButton onClick={closePopup}>×</CloseButton>
            YEOOL
            {console.log("asdok")}
            <h2>{selectedDentist.name}</h2>
            <p>{selectedDentist.Address_1}</p>
            <p>{position}</p>

            <MapContainer
              center={position} zoom={9}
              style={{ height: '500px', width: '100%' }}
            >
              <TileLayer
                // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                url="https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=97720df4d6654597a9e74d24e57432e0"
              />
              <Marker position={position}>
                <LeafletPopup>{selectedDentist.Address_1}</LeafletPopup>
              </Marker>
            </MapContainer>
            <button onClick={closePopup}>Close</button>
          </PopupContent>
        </PopupContainer>
      )} */}
      
    </div>
  );
};

